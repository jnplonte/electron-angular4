import { Injectable, Inject } from '@angular/core';

import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';

PouchDB.plugin(PouchFind);
PouchDB.plugin(require('pouchdb-authentication'));

if (process.env.ENV === 'development') {
    PouchDB.debug.enable('pouchdb:find');
}

import * as CryptoJS from 'crypto-js';

import { userModel } from './../../models/user.model';

@Injectable()
export class DataBaseUserService {

    private isInstantiated: boolean = false;
    private database: any;
    private databaseInformation: Object = {};
    private ajaxOpts: Object = {};

    constructor(@Inject('configService') private configService: any) {
        if (!this.isInstantiated && typeof(configService.data.dataBaseInformation) !== 'undefined' && configService.data.dataBaseInformation.hasOwnProperty('user')) {
            this.databaseInformation = configService.data.dataBaseInformation;
            this.database = new PouchDB(this.databaseInformation['user']);

            this.isInstantiated = true;

            this.ajaxOpts = {
                ajax: {
                    headers: {
                        Authorization: 'Basic ' + window.btoa(this.databaseInformation['userName'] + ':' + this.databaseInformation['password'])
                    }
                }
            }
        }
    }

    // checkAdminExists() {
    //     this.fetch().then( results => {
    //         if (results.total_rows === 0 ) {
    //             let adminData: userModel<any> = {
    //                 '_id': '',
    //                 '_rev': '',
    //                 'username': 'test-user',
    //                 'password': 'password',
    //                 'hashPassword': CryptoJS.MD5('password').toString(),
    //                 'role': ['employee'], // employee, admin, manager
    //                 'active': true,
    //                 'otherInformation': {
    //                     'emailAddress': '',
    //                     'contactNumber': '',
    //                     'firstName': '',
    //                     'lastName': '',
    //                     'address': '',
    //                     'position': ''
    //                 }
    //             }

    //             this.put(this.helperService.generateRandomID(), adminData);

    //             this.sync();
    //         }
    //     });
    // }

    fetch() {
        return this.database.allDocs({include_docs: true});
    }

    get(id: string) {
        return this.database.get(id);
    }

    find(queryIndex: Array<any> = null, selector: Object = null, sort: Object = null, limit: Object = null) {
        let queryObject: Object = {};
        queryObject['selector'] = selector;

        if (selector) {
            queryObject['selector'] = selector;
        }

        if (sort) {
            queryObject['sort'] = sort;
        }

        if (limit) {
            queryObject['limit'] = limit;
        }

        if (queryIndex) {
            let db: any = this.database;
            return db.createIndex({
                index: {
                    fields: queryIndex
                }
            }).then(function () {
                return db.find(queryObject);
            });
        } else {
            return this.database.find(queryObject);
        }
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

    sync() {
        let remoteDatabase: any = new PouchDB(this.databaseInformation['host'] + '/' + this.databaseInformation['user'], {skip_setup: true});
        return this.logInUser(remoteDatabase).then(result => {
            return this.syncDatabase(remoteDatabase);
        }, error => {
            console.error(JSON.stringify(error));
            return false;
        });
    }

    logInUser(remoteDatabase: any) {
        return remoteDatabase.login(this.databaseInformation['userName'], this.databaseInformation['password'], this.ajaxOpts);
    }

    syncDatabase(remoteDatabase: any) {
        return this.database.sync(remoteDatabase).on('complete', () => {
            return true;
        }).on('error', errorSync => {
            console.error(JSON.stringify(errorSync));
            return false;
        });
    }
}
