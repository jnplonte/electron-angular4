import { Injectable, Inject } from '@angular/core';

import * as CryptoJS from 'crypto-js';

@Injectable()
export class AuthenticationService {

    constructor(@Inject('dataBaseUserService') private dataBaseUserService: any, @Inject('helperService') private helperService: any) {

    }

    login(username: string, password: string, isAdmin: boolean = false) {
        return this.dataBaseUserService.find(['username'], {username: username, hashPassword: CryptoJS.MD5(password).toString()}).then(result => {
            if (typeof(result.docs) !== 'undefined' && result.docs.length >= 1 && result.docs[0].active) {
                let document: Object = {
                    'id' : result.docs[0]._id || '',
                    'role' : result.docs[0].role || [],
                    'username' : result.docs[0].username || '',
                    'otherInformation' : result.docs[0].otherInformation || {},
                };
                return this.helperService.createStorage('auth-token', document);
            } else {
                return false;
            }
        }, error => {
            return false;
        });
    }

    logout() {
        return this.helperService.clearStorage();
    }

    // sync() {
    //     this.dataBaseUserService.sync();
    // }
}
