import {Inject, Injectable, NgZone} from '@angular/core';

@Injectable()
export class OfficeService {
    private _isOfficeApp: boolean;

    constructor(private _ngZone: NgZone, @Inject('isContentApp') isContentApp: boolean) {
        this._isOfficeApp = location.search.indexOf('?_host_Info') > -1 && isContentApp;
    }

    public get isOfficeApp(): boolean {
        return this._isOfficeApp;
    }
}
