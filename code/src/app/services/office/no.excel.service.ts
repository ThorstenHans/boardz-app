import {BaseExcelService} from './base.excel.service';
import {Observable} from 'rxjs/Observable';

export class NoExcelService extends BaseExcelService {
    getValueFromCell(): Observable<any> {
        return Observable.of(null);
    }

    setCellValue(value: string): Observable<any> {
        return Observable.of(null);
    }

    setRangeValue(value: any): Observable<string> {
        return Observable.of(null);
    }

}
