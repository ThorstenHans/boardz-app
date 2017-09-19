import {Injectable} from '@angular/core';
import Dexie from 'dexie';
import {Category} from '../../models/category';
import {Game} from '../../models/game';
import {AgeRating} from '../../models/ageRating';
import {ModelState} from '../../models/modelState';
import {ItemState, ItemSyncResponse, SyncResponse} from '../../models/syncResponse';

@Injectable()
export class DatabaseService extends Dexie {

    constructor() {
        super('boardzdb');
        this.version(1).stores({
            games: '&id, name, description, userName, state, ageRatingId, rowVersion',
            categories: '&id, name, state, numberOfGames, rowVersion',
            ageRatings: '&id, name, colorIndicator, state'
        });

    }

    public games: Dexie.Table<Game, string>;
    public categories: Dexie.Table<Category, string>;
    public ageRatings: Dexie.Table<AgeRating, string>;

    public getStats(): Promise<{ games: number, categories: number, players: number }> {
        return this.games.filter(g => g.state !== ModelState.Deleted).count()
            .then(gamesCount => {
                return this.categories.filter(c => c.state !== ModelState.Deleted).count()
                    .then(categoriesCount => {
                        return {
                            games: gamesCount,
                            categories: categoriesCount
                        };
                    });
            })
            .then(gamesAndCategories => {
                return {
                    players: 0,
                    games: gamesAndCategories.games,
                    categories: gamesAndCategories.categories
                };
            });
    }

    public updateOfflineStore(syncResponse: SyncResponse): Promise<boolean> {
        return new Promise((resolve, reject) => {

            return Promise.all([
                this._updateOfflineCategories(syncResponse.categories),
                this._updateOfflineGames(syncResponse.games)
            ]).then(results => {
                resolve(true);
            }, (e) => {
                console.warn(`dbservice: ${e}`);
                reject(e);
            });
        });
    }

    private _updateOfflineCategories(categoriesSyncResponses: Array<ItemSyncResponse>): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const updates = [];
            categoriesSyncResponses.forEach(change => {
                switch (change.state) {
                    case ItemState.Deleted:
                        updates.push(this.categories.delete(change.id));
                        break;
                    default:
                        updates.push(this.categories.delete(change.offlineId));
                        if (change.replacement) {
                            change.replacement.state = ModelState.Clean;
                            updates.push(this.categories.add((new Category()).fromRawJson(change.replacement)));
                        }
                        break;
                }
            });

            Promise.all(updates)
                .then(results => {
                    resolve(results);
                }, (e) => {
                    reject(e);
                });
        });
    }

    private _updateOfflineGames(gamesSyncResponses: Array<ItemSyncResponse>): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const updates = [];
            gamesSyncResponses.forEach(change => {
                switch (change.state) {
                    case ItemState.Deleted:
                        updates.push(this.games.delete(change.id));
                        break;
                    default:
                        updates.push(this.games.delete(change.offlineId));
                        if (change.replacement) {
                            change.replacement.state = ModelState.Clean;
                            updates.push(this.games.add((new Game()).fromRawJson(change.replacement)));
                        }
                        break;
                }
            });

            Promise.all(updates)
                .then(results => {
                    resolve(results)
                }, (e)=>{
                    reject(e);
                });
        });
    }
}
