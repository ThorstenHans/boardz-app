import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LogService} from './infrastructure/log.service';

const tokenKey = 'Authentication::Token';
const usernameKey = 'Authentication::Username';
const expiryKey = 'Authentication::TokenExpiration';

@Injectable()
export class TokenService {
    private _authenticated: boolean;

    constructor(private _logService: LogService) {
        const token = this.token;

        if ((typeof token !== 'undefined') && (token !== null)) {
            this._authenticated = true;
        }
    }

    public get token(): string {
        const token = localStorage.getItem(tokenKey);
        return token;
    }

    public set token(token: string) {
        this._logService.logVerbose('TokenService: Setting token: ' + token);

        if (token === null) {
            localStorage.removeItem(tokenKey);
            this.username = null;
            this.tokenExpiry = null;
            this._authenticated = false;
        } else {
            localStorage.setItem(tokenKey, token);
            this._authenticated = true;
        }
    }

    public get username(): string {
        const username = localStorage.getItem(usernameKey);
        this._logService.logVerbose('TokenService: Retrieved user name: ' + username);

        return username;
    }

    public set username(username: string) {
        this._logService.logVerbose('TokenService: Setting user name: ' + username);

        if (username === null) {
            localStorage.removeItem(usernameKey);
        } else {
            localStorage.setItem(usernameKey, username);
        }
    }

    public get tokenExpiry(): Date {
        const value = localStorage.getItem(expiryKey);
        return (value !== null) ? new Date(value) : null;
    }

    public set tokenExpiry(expiryDate: Date) {
        this._logService.logVerbose('TokenService: Setting token expiry: ' + expiryDate);

        if (expiryDate === null) {
            localStorage.removeItem(expiryKey);
        } else {
            localStorage.setItem(expiryKey, expiryDate.toISOString());
        }
    }

    public isAuthenticated(): Observable<boolean> {
        return Observable.of(this.token && this.tokenExpiry > new Date());
    }
}
