import {Injectable, Type} from '@angular/core';
import {AuthenticatedHttp} from '../http.service';
import {Observable} from 'rxjs/Rx';
import {OfflineDetectionService} from '../offline/offline.detection.service';
import {ISupportsOfflineStorage} from '../../interfaces/supportsOfflineStorage';
import {Dexie} from 'dexie';

@Injectable()
export abstract class BaseApiService<T extends ISupportsOfflineStorage<T>> {

    private _entityType: Type<any>;

    constructor(private _authenticatedHttp: AuthenticatedHttp,
                private _offlineDetectionService: OfflineDetectionService) {
    }

    public initializeEntity(type: Type<any>) {
        this._entityType = type;
    }

    /**
     * return all items of the generic type
     */
    protected getAll(url: string,
                     table: Dexie.Table<ISupportsOfflineStorage<T>, string>,
                     offlineFallback: Observable<Array<T>>,
                     force: boolean = false): Observable<Array<T>> {

        const httpObservable: Observable<Array<T>> = this._authenticatedHttp.get(url)
            .map(response => response.json())
            .map(rawJsonResults => rawJsonResults.map(rawJsonResult => (new this._entityType()).fromRawJson(rawJsonResult)))
            .do((results) => table.bulkPut(results).then(() => results, (err) => console.log(err)));

        return Observable.if(() => {
            return force || this._offlineDetectionService.isOnline;
        }, httpObservable, offlineFallback);
    }

    /**
     * return either an item by it's identifier or null
     * @param id
     */
    protected getSingle(id: string, url: string, offlineFallback: Observable<T>): Observable<T> {
        const httpObservable = this._authenticatedHttp.get(url)
            .map(response => response.json())
            .map(rawJsonResult => (new this._entityType()).fromRawJson(rawJsonResult));

        return <Observable<T>>Observable.if(() => {
            return this._offlineDetectionService.isOnline;
        }, httpObservable, offlineFallback);

    }

    /**
     * persist the new item
     * @param item
     */
    public add(item: T, url: string, offlineFallback: Observable<string>): Observable<string> {
        const httpObservable = this._authenticatedHttp.post(url, JSON.stringify(item))
            .map(response => response.text());

        return Observable.if(() => {
            return this._offlineDetectionService.isOnline;
        }, httpObservable, offlineFallback);
    }

    /**
     * Send an update for the item
     * @param item
     */
    public update(item: T, url: string, offlineFallback: Observable<boolean>): Observable<boolean> {
        const httpObservable = this._authenticatedHttp.put(url, JSON.stringify(item))
            .map(response => response.ok);

        return Observable.if(() => {
            return this._offlineDetectionService.isOnline;
        }, httpObservable, offlineFallback);
    }

    /**
     * Delete a given item, resolves with false if operation failed or item has no property id
     * @returns {any}
     */
    public deleteItem(url: string, offlineFallback: Observable<boolean>): Observable<boolean> {
        const httpObservable = this._authenticatedHttp.delete(url)
            .map(response => response.status);

        return Observable.if(() => {
            return this._offlineDetectionService.isOnline;
        }, httpObservable, offlineFallback);
    }

}
