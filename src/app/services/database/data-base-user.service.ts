import { Injectable, Inject } from '@angular/core';

import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-authentication'));

import * as CryptoJS from 'crypto-js';

import { userModel } from './../../models/user.model';

@Injectable()
export class DataBaseUserService {

    private isInstantiated: boolean = false;
    private database: any;
    private databaseInformation: Object = {};

    constructor(@Inject('configService') private configService: any, @Inject('helperService') private helperService: any) {
        if (!this.isInstantiated && typeof(configService.data.dataBaseInformation) !== 'undefined' && configService.data.dataBaseInformation.hasOwnProperty('user')) {
            this.databaseInformation = configService.data.dataBaseInformation;
            this.database = new PouchDB(this.databaseInformation['user']);

            this.isInstantiated = true;
        }
    }

    checkAdminExists() {
        this.fetch().then( results => {
            if (results.total_rows === 0 ) {
                let adminData: userModel<any> = {
                    '_id': '',
                    '_rev': '',
                    'username': 'admin',
                    'password': 'password',
                    'hashPassword': CryptoJS.MD5('password').toString(),
                    'role': ['admin'],
                    'active': true,
                    'otherInformation': {
                        'emailAddress': '',
                        'contactNumber': '',
                        'firstName': '',
                        'lastName': '',
                        'address': '',
                        'position': ''
                    }
                }

                this.put(this.helperService.generateRandomID(), adminData);
            }
        });
    }

    fetch() {
        return this.database.allDocs({include_docs: true});
    }

    get(id: string) {
        return this.database.get(id);
    }

    put(id: string, document: userModel<any>) {
        document._id = id;
        return this.get(id).then(result => {
            document._rev = result._rev;
            return this.database.put(document);
        }, error => {
            if (error.status === 404) {
                return this.database.put(document);
            } else {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }

    // delete(id: string) {
    //     return this.get(id).then(result => {
    //         return this.database.remove(result._id, result._rev);
    //     }, error => {
    //         return new Promise((resolve, reject) => {
    //             reject(error);
    //         });
    //     });
    // }
}
