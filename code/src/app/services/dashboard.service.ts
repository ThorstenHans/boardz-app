import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthenticatedHttp} from './http.service';
import {DatabaseService} from './offline/database.service';
import {OfflineDetectionService} from './offline/offline.detection.service';
import {ModelState} from '../models/modelState';

@Injectable()
export class DashboardService {
    constructor(private _http: AuthenticatedHttp,
                private _databaseService: DatabaseService,
                private _offlineDetectionService: OfflineDetectionService) {
    }

    public getStats(): Observable<{games: number, categories: number, players: number}> {
        return Observable.if(() => {
                return this._offlineDetectionService.isOnline;
            },
            this._http.get('api/dashboard/stats').map(response => (response.json())).catch(() => Observable.of(null)),
            Observable.fromPromise(this._databaseService.getStats()));
    }


}
