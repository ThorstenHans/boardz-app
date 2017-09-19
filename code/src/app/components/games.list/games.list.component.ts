import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Game} from '../../models/game';
import {GamesService} from '../../services/games.service';
import {NotificationService} from '../../services/notifications/notification.service';
import {RuntimeService} from '../../services/infrastructure/runtime.service';
import {BaseExcelService} from '../../services/office/base.excel.service';
import {SyncService} from '../../services/offline/sync.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-games-list',
    templateUrl: 'games.list.component.html'
})
export class GamesListComponent implements OnInit, OnDestroy {

    public games: Game[];
    private _syncServiceSubscription: Subscription;

    constructor(private _gamesService: GamesService,
                private _router: Router,
                private _route: ActivatedRoute,
                private _notificationService: NotificationService,
                private _syncService: SyncService,
                private _runtimeService: RuntimeService,
                private _baseExcelService: BaseExcelService) {
    }

    public get isInExcel(): boolean {
        return this._runtimeService.isExcelApp;
    }

    public sendToExcel(): void {
        const headers = ['Id', 'Name', 'Description'];
        const data = this.games.map(game => [game.id, game.name, game.description]);

        this._baseExcelService.sendTableToSelection(headers, data).subscribe();
    }

    public openGameDetails(game: Game): void {
        if(game.id.startsWith('-')){}
        this._router.navigate(['../details', game.id], {relativeTo: this._route});
    }

    public openCreateGame(): void {
        this._router.navigate(['../new'], {relativeTo: this._route});
    }

    public isSynced(id: string): boolean {
        return !id.startsWith('-');
    }

    public ngOnInit(): void {
        this._syncServiceSubscription = this._syncService.onSynced.subscribe((success)=>{
            this._loadData();
        });
        this._loadData();
    }

    private _loadData(){
        this._gamesService.getAllGames()
            .subscribe(
                (games) => this.games = games,
                (err) => this._notificationService.notifyError('Error while fetching game data')
            );
    }

    public ngOnDestroy(): void {
        if(this._syncServiceSubscription && !this._syncServiceSubscription.closed){
            this._syncServiceSubscription.unsubscribe();
        }
    }
}
