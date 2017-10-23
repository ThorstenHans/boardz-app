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
        return Observable.create((observer) => {
            Office.context.document.getSelectedDataAsync(Office.CoercionType.Text, {
                valueFormat: 'unformatted',
                filterType: 'all'
            }, (result: Office.AsyncResult) => {
                let value = '';
                if (result.status === Office.AsyncResultStatus.Succeeded) {
                    value = result.value;
                }
                this._ngZone.run(() => {
                    observer.next(value);
                    observer.complete();
                })

            });
        });
    }

    sendValueToSelection(value: string): Observable<any> {
        return Observable.create((observer)=>{
           Office.context.document.setSelectedDataAsync(value, {
               valueFormat: 'unformatted'
           }, (result: Office.AsyncResult) =>{
               if(result.status === Office.AsyncResultStatus.Succeeded){
                   observer.next();
               }
           })
        });
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
