import {RuntimeService} from '../infrastructure/runtime.service';
import {ExcelService} from './excel.service';
import {NoExcelService} from './no.excel.service';
import {NgZone} from '@angular/core';
import {OutlookService} from './outlook.service';
import {NoOutlookService} from './no.outlook.service';

export function excelServiceFactory(runtimeService: RuntimeService, ngZone: NgZone) {
    return runtimeService.isOfficeApp ? new ExcelService(ngZone) : new NoExcelService();
}

export function outlookServiceFactory(runtimeService: RuntimeService, ngZone: NgZone) {
    return runtimeService.isOfficeApp ? new OutlookService(ngZone) : new NoOutlookService();
}
