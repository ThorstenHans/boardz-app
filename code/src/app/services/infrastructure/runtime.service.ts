import { Injectable } from '@angular/core';

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

    // IJS Electron demo hook

    public get isExcelApp(): boolean {
        return this.isOfficeApp && Office.context.host === Office.HostType.Excel;
    }

    public get isOutlookApp(): boolean {
        return this.isOfficeApp && Office.context.host === Office.HostType.Outlook;
    }

    private guessPlatform(): void {
        this._isMobile = window.hasOwnProperty('cordova');
        this._isDesktop = window.navigator.userAgent.match(/Electron/) !== null;
        this._isWeb = !(this._isMobile || this._isDesktop);
    }
}
