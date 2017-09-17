import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {DatabaseService} from './database.service';
import {OfflineDetectionService} from './offline.detection.service';
import {AuthenticatedHttp} from '../http.service';
import {Category} from '../../models/category';
import {ModelState} from '../../models/modelState';
import {Game} from '../../models/game';
import {NotificationService} from '../notifications/notification.service';
import {Notification} from '../../models/notification';
import {NotificationType} from '../../models/notificationType';
import {Observable} from 'rxjs/Observable';
import {SyncResponse} from '../../models/syncResponse';

@Injectable()
export class SyncService {

    constructor(private _authenticatedHttp: AuthenticatedHttp,
                private _databaseService: DatabaseService,
                private _offlineDetectionService: OfflineDetectionService,
                private _notificationService: NotificationService) {

        this._offlineDetectionService.connectionRestoring
            .asObservable()
            .subscribe(() => {
                this._syncOfflineData();
            });

    }

    /**
     * This method is responsible for synchronizing all the data created / manipulated while being offline
     */
    private _syncOfflineData() {

        const categories = this._getModifiedCategories();
        const games = this._getModifiedGames();

        Promise.all([categories, games])
            .then(values => {
                this._syncData(values[0], values[1])
                    .subscribe((response) => {
                        if (response.ok) {
                            const syncResponse = <SyncResponse>response.json();
                            if (syncResponse) {
                                this._databaseService.updateOfflineStore(syncResponse)
                                    .then((success) => {
                                        //noinspection TsLint
                                        new Notification('Device is back only and data has been synced.',
                                            NotificationType.Information);
                                    });
                            }


                        } else {
                            //noinspection TsLint
                            new Notification('Device is back only, but data sync wasnt successful. Will retry',
                                NotificationType.Warning);
                        }
                    });
            });


    }

    private _getModifiedCategories(): Promise<Array<Category>> {
        return this._databaseService
            .categories
            .filter(category => category.state !== ModelState.Clean)
            .toArray();
    }

    private _getModifiedGames(): Promise<Array<Game>> {
        return this._databaseService
            .games
            .filter(game => game.state !== ModelState.Clean)
            .toArray();
    }

    private _syncData(categories: Array<Category>, games: Array<Game>): Observable<Response> {
        if (categories.length === 0 && games.length === 0) {
            return Observable.of({ok: true, json: () => null});
        }
        const payload = {
            categories: categories,
            games: games
        };

        return this._authenticatedHttp.post('api/sync', JSON.stringify(payload));
    }

}
