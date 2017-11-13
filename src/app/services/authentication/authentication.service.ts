import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string, isAdmin: boolean = false) {
        if (isAdmin) {
            let headers: any = new Headers();
            headers.append('Content-Type', 'application/json');

            let observable: Observable<any> = this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
                .map((response: Response) =>  {
                    if (response.status === 200) {
                        localStorage.setItem('auth-token', 'test-content');
                        return response.json();
                    } else {
                        return {};
                    }
                }).share();

            return observable;
        } else {
            // login via pouchdb
            return false;
        }
    }

    logout() {
        localStorage.removeItem('auth-token');
    }
}
