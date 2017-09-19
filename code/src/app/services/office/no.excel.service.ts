import {BaseExcelService} from './base.excel.service';
import {Observable} from 'rxjs/Observable';

export class NoExcelService extends BaseExcelService {
    getValueFromSelection(): Observable<any> {
        return Observable.of(null);
    }

    sendValueToSelection(value: string): Observable<any> {
        return Observable.of(null);
    }

    sendTableToSelection(headers: Array<string>, rows: Array<Array<any>>): Observable<boolean> {
        return Observable.of(true);
    }

}
