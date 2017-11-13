export class userModel<T>{
    '_id': string;
    '_rev': string;
    'username': string;
    'password': string;
    'hashPassword': string;
    'role': Object;
    'active': boolean;
    'otherInformation': any;

    constructor(data: { _id?: string, _rev?: string, username?: string, password?: string, hashPassword?: string, role?: Object, active?: boolean, otherInformation?: any } = {}) {
        this._id = data._id || '';
        this._rev = data._rev || '';
        this.username = data.username || '';
        this.password = data.password || '';
        this.hashPassword = data.hashPassword || '';
        this.role = data.role || [];
        this.active = !!data.active;
        this.otherInformation = data.otherInformation || {};
    }
}
