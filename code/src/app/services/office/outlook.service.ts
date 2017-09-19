import {Injectable, NgZone} from '@angular/core';
import {BaseOutlookService} from './base.outlook.service';

@Injectable()
export class OutlookService extends BaseOutlookService {

    constructor(private _ngZone: NgZone) {
        super();
    }
}
