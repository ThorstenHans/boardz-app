import {Injectable} from '@angular/core';
import HostType = Office.HostType;

declare let window;

@Injectable()
export class RuntimeService {

    private _isMobile: boolean;
    private _isDesktop: boolean;
    private _isWeb: boolean;

    constructor() {
        this.guessPlatform();
    }

    public get isMobile(): boolean {
        return this._isMobile;
    }

    public get isDesktop(): boolean {
        return this._isDesktop;
    }

    public get isWeb(): boolean {
        return this._isWeb;
    }

    public get isOfficeApp(): boolean {
        return window.hasOwnProperty('Office');
    }

    public get isExcelApp(): boolean {
        return Office.context.host === HostType.Excel;
    }

    public get isOutlookApp(): boolean {
        return Office.context.host === HostType.Outlook;
    }

    private guessPlatform(): void {
        this._isMobile = !!window.cordova;
        this._isDesktop = window.navigator.userAgent.match(/Electron/) !== null;
        this._isWeb = !(this._isMobile || this._isDesktop);
    }
}
