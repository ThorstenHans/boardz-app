import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {LogService} from '../../services/infrastructure/log.service';
import {LogLevel} from '../../models/logLevel';
import {UiNotificationService} from '../../services/notifications/ui.notification.service';
import {DesktopService} from '../../services/infrastructure/desktop.service';
import {IBoardZAppWindow} from '../../interfaces/boardzAppWindow';
import {OfflineDetectionService} from '../../services/offline/offline.detection.service';
import {SyncService} from '../../services/offline/sync.service';

declare const window: IBoardZAppWindow;

//noinspection TsLint
@Component({
    //noinspection TsLint
    selector: 'body',
    templateUrl: 'root.component.html'
})

export class RootComponent implements OnInit, AfterViewInit, OnDestroy {
    constructor(private _offlineDetectionService: OfflineDetectionService,
                private _syncService: SyncService,
                private _nativeIntegrationService: DesktopService,
                private _uiNotificationService: UiNotificationService,
                private _logService: LogService) {
        _logService.maximumLogLevel = LogLevel.Verbose;
        _uiNotificationService.subscribeToNotifications();
    }

    public ngOnInit(): void {
        this._offlineDetectionService.startConnectionMonitoring();
    }


    public ngAfterViewInit(): any {
        if (window.initAdminLTE) {
            window.initAdminLTE();
        }
        this._nativeIntegrationService.registerNavigationHook();
    }

    public ngOnDestroy(): void {
        this._offlineDetectionService.stopConnectionMonitoring();
    }
}
