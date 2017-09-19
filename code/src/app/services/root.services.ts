import {AuthenticatedGuard} from '../guards/authenticated.guard';
import {CategoriesService} from './categories.service';
import {AgeRatingsService} from './ageratings.service';
import {DatabaseService} from './offline/database.service';
import {SyncService} from './offline/sync.service';
import {UiNotificationService} from './notifications/ui.notification.service';
import {RuntimeService} from './infrastructure/runtime.service';
import {NotificationService} from './notifications/notification.service';
import {PlayersService} from './players.service';
import {GamesService} from './games.service';
import {LogService} from './infrastructure/log.service';
import {DashboardService} from './dashboard.service';
import {LoginService} from './authentication.service';
import {TokenService} from './token.service';
import {AuthenticatedHttp} from './http.service';
import {DesktopService} from './infrastructure/desktop.service';
import {OfflineDetectionService} from './offline/offline.detection.service';
import {excelServiceFactory, outlookServiceFactory} from './office/office.providers';
import {NgZone} from '@angular/core';
import {BaseExcelService} from './office/base.excel.service';
import {BaseOutlookService} from './office/base.outlook.service';

export const ROOT_SERVICES = [
    OfflineDetectionService,
    DesktopService,
    AuthenticatedHttp,
    TokenService,
    LoginService,
    DashboardService,
    LogService,
    GamesService,
    PlayersService,
    NotificationService,
    RuntimeService,
    UiNotificationService,
    SyncService,
    DatabaseService,
    AgeRatingsService,
    CategoriesService,
    AuthenticatedGuard,
    {provide: BaseExcelService, useFactory: excelServiceFactory, deps: [RuntimeService, NgZone]},
    {provide: BaseOutlookService, useFactory: outlookServiceFactory, deps: [RuntimeService, NgZone]}
];
