import { Injectable, EventEmitter, Inject } from '@angular/core';

import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';

PouchDB.plugin(PouchFind);
PouchDB.plugin(require('pouchdb-authentication'));

if (process.env.ENV === 'development') {
    PouchDB.debug.enable('pouchdb:find');
}

@Injectable()
export class DataBaseMainService {

    private isInstantiated: boolean = false;
    private database: any;
    private databaseInformation: Object = {};
    private ajaxOpts: Object = {};

    constructor(@Inject('configService') private configService: any) {
        if (!this.isInstantiated && typeof(configService.data.dataBaseInformation) !== 'undefined' && configService.data.dataBaseInformation.hasOwnProperty('main')) {
            this.databaseInformation = configService.data.dataBaseInformation;
            this.database = new PouchDB(this.databaseInformation['main']);

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

    fetch() {
        return this.database.allDocs({include_docs: true});
    }

    find(selector: Object = {}, sort: Object = null, limit: Object = null) {
        let queryObject: Object = {};
        queryObject['selector'] = selector;

        if (sort) {
            queryObject['sort'] = sort;
        }

        if (limit) {
            queryObject['limit'] = limit;
        }

        return this.find(queryObject);
    }

    get(id: string) {
        return this.database.get(id);
    }

    put(id: string, document: any) {
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

    sync() {
        let remoteDatabase: any = new PouchDB(this.databaseInformation['host'] + '/' + this.databaseInformation['main'], {skip_setup: true});
        return this.logInUser(remoteDatabase).then(result => {
            return this.syncDatabase(remoteDatabase);
        }, error => {
            console.error(JSON.stringify(error));
            return false;
        });
    }

    // signup (username: string, password: string) {
    //     let remoteDatabase: any = new PouchDB(this.databaseInformation['host'] + '/' + this.databaseInformation['user'], {skip_setup: true});
    //     return this.logInUser(remoteDatabase).then(result => {
    //         return this.signUpUser(remoteDatabase, username, password);
    //     }, error => {
    //         console.error(JSON.stringify(error));
    //         return false;
    //     });
    // }

    // login (username: string, password: string) {
    //     return this.logInUser(this.database).then(result => {
    //         return result;
    //     }, error => {
    //         console.error(JSON.stringify(error));
    //         return false;
    //     });
    // }

    // signUpUser (remoteDatabase: any, username: string, password: string) {
    //     let metaData: Object = {
    //         metadata: {
    //             email : 'test2@test.com',
    //             birthDay : 'birth-date-here',
    //             contactNumber : 'contact-number-here'
    //         },
    //         roles : ['employee']
    //     };

    //     return remoteDatabase.signup(username, password, metaData).then(resultSignup => {
    //         return this.syncDatabase(remoteDatabase);
    //     }, errorSignUp => {
    //         console.error(JSON.stringify(errorSignUp));
    //         return false;
    //     });
    // }

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
