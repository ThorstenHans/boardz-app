import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {ConnectionState} from '../../models/connectionState';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Subject} from 'rxjs/Rx';
import {environment} from '../../../environments/environment';

@Injectable()
export class OfflineDetectionService {
    private _monitoringHandle: number;
    private _recentConnectionState: ConnectionState = ConnectionState.Initializing;

    constructor(private _http: Http) {
        this._recentConnectionState = ConnectionState.Initializing;
    }

    /**
     * Subject that emits the recent state, but only if the device comes back from an
     * offline state and the upcoming one will be online
     * @type {Subject<ConnectionState>}
     */
    public connectionRestoring: Subject<ConnectionState> = new Subject<ConnectionState>();

    /**
     * Subject responsible for emitting the most recent ConnectionState
     * @type {Subject<ConnectionState>}
     */
    public connectionChanged: Subject<ConnectionState> = new Subject<ConnectionState>();

    /**
     * start connection monitoring
     */
    public startConnectionMonitoring(): void {
        if(!environment.offlineConfig.enabled){
            this.connectionChanged.next(ConnectionState.Good);
            return;
        }
        this._monitoringHandle = window.setInterval(() => {
            this._checkConnection().subscribe(state => {
                // emit the state only! if the state was offline and will be treated as online
                if (this._recentConnectionState < ConnectionState.Normal && state > ConnectionState.ToSlow) {
                    this.connectionRestoring.next(state);
                }

                this._recentConnectionState = state;
                // emit the new state
                this.connectionChanged.next(state);
            });
        }, environment.offlineConfig.checkInterval);
    }

    /**
     * Stop monitoring the connectivity
     */
    public stopConnectionMonitoring(): void {
        if (this._monitoringHandle) {
            clearInterval(this._monitoringHandle);
        }
    }

    /**
     * public getter for the current Connection state
     * @returns {ConnectionState}
     */
    public get currentConnectionState(): ConnectionState {
        return this._recentConnectionState;
    }

    /**
     * when should the app fall to offline fallbacks
     * @returns {boolean}
     */
    public get isOnline(): boolean {
        return this._recentConnectionState > ConnectionState.ToSlow
            || this._recentConnectionState === ConnectionState.Initializing;
    }

    /**
     * readonly getter for the PING endpoint
     * @returns {string}
     */
    private get _pingUrl(): string {
        return `${environment.apiRootUrl}api/status/ping`;
    }

    private _checkConnection(): Observable<ConnectionState> {
        const start = (new Date()).getTime();
        return this._http.get(this._pingUrl)
            .map(response => response.json())
            .timeoutWith(environment.offlineConfig.absoluteTimeoutAt, Observable.of({success: false}))
            .map(response => !response.success ? environment.offlineConfig.absoluteTimeoutAt + 1 : (new Date()).getTime() - start)
            .map(duration => this._getConnectionStateByDuration(duration))
            .catch((err) => {
                console.info(`error: Offline ${err}`);
                return Observable.of(ConnectionState.Offline);
            });
    }

    private _getConnectionStateByDuration(duration: number): ConnectionState {
        // console.info(`evaluating connection state for ${duration}`);
        if (duration <= environment.offlineConfig.maxDurationForGood) {
            console.info(`${duration}ms: Good`);
            return ConnectionState.Good;
        }
        if (duration <= environment.offlineConfig.maxDurationForNormal) {
            console.info(`${duration}ms: Normal`);
            return ConnectionState.Normal;
        }
        if (duration <= environment.offlineConfig.maxDurationForToSlow) {
            console.info(`${duration}ms: ToSlow`);
            return ConnectionState.ToSlow;
        }
        // duration is longer than this._offlineConfig.maxDurationForToSlow
        console.info(`${duration}ms: Offline`);
        return ConnectionState.Offline;

    }

}
