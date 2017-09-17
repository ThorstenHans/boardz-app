import {Injectable, NgZone} from '@angular/core';
import {BaseExcelService} from './base.excel.service';
import {Observable} from 'rxjs/Observable';
import TableData = Office.TableData;

@Injectable()
export class ExcelService extends BaseExcelService {

    constructor(private _ngZone: NgZone) {
        super();
    }

    getValueFromSelection(): Observable<any> {
        throw new Error('Method not implemented.');
    }

    sendValueToSelection(value: string): Observable<any> {
        throw new Error('Method not implemented.');
    }

    sendTableToSelection(headers: string[], rows: any[][]): Observable<boolean> {
        return Observable.create((observer) => {
            const tableData: TableData = new TableData();
            tableData.headers = headers;
            tableData.rows = rows;
            const options = {};
            Office.context.document.setSelectedDataAsync(tableData, options, (result: Office.AsyncResult) => {
                observer.next(result.status === Office.AsyncResultStatus.Succeeded);
                observer.complete();
            });
        });
    }
}
