import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';

PouchDB.plugin(PouchFind);
PouchDB.plugin(require('pouchdb-authentication'));

import * as _ from 'lodash';

if (process.env.ENV === 'development') {
    PouchDB.debug.enable('pouchdb:find');
}

export abstract class DataBaseService {
    private databaseInformation: Object = {};

    private database: any;
    private databaseName: string;

    private logInUser (remoteDatabase: any, authHeaders: object) {
        return remoteDatabase.login(this.databaseInformation['userName'], this.databaseInformation['password'], authHeaders);
    }

    set DatabaseInformation(databaseInfoValue: Object) {
        this.databaseInformation = databaseInfoValue;
    }

    get DatabaseInformation(){
        return this.databaseInformation;
    }

    set Database(databaseValue: string) {
        this.database = new PouchDB(databaseValue, { auto_compaction: true });
        this.databaseName = databaseValue;
    }

    get Database(){
        return this.database;
    }

    get DatabaseName(){
        return this.databaseName;
    }

    fetch() {
        return this.database.allDocs({ include_docs: true });
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

    put(id: string, document: any) {
        document._id = id;
        return this.get(id).then(result => {
            let finalDocument: Object = _.merge(result, document);
            return this.database.put(finalDocument);
        }, error => {
            if (error.status === 404) {
                return this.database.put(document);
            } else {
                return new Promise((resolve, reject) => {
                    console.error(JSON.stringify(error));
                    reject(error);
                });
            }
        });
    }

    sync() {
        let authHeaders: Object = {
            Authorization: 'Basic ' + window.btoa(this.databaseInformation['userName'] + ':' + this.databaseInformation['password'])
        };

        let remoteDatabase: any = new PouchDB(this.databaseInformation['host'] + '/' + this.DatabaseName,
        { skip_setup: true },
        { ajax: {
                cache: false,
                headers: authHeaders,
            },
            auth: {
                username: this.databaseInformation['userName'],
                password: this.databaseInformation['password']
            }
        });

        return this.logInUser(remoteDatabase, authHeaders).then(result => {
            if (result.ok) {
                return this.database.sync(remoteDatabase);
            } else {
                console.error(JSON.stringify(result));
                return false;
            }
        }, error => {
            console.error(JSON.stringify(error));
            return false;
        });
    }
}
