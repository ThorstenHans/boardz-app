import {Observable} from 'rxjs/Observable';

export abstract class BaseExcelService {
    abstract getValueFromSelection(): Observable<any>;

    abstract sendValueToSelection(value: string): Observable<any>;

    abstract sendTableToSelection(headers: Array<string>, rows: Array<Array<any>>): Observable<boolean>;
}
