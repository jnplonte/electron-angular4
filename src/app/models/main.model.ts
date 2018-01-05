export class mainModel<T>{
    '_id': string;
    '_rev': string;
    'active': boolean;
    'otherInformation': any;

    constructor(data: { _id?: string, _rev?: string, active?: boolean, otherInformation?: any } = {}) {
        this._id = data._id || '';
        this._rev = data._rev || '';
        this.active = !!data.active;
        this.otherInformation = data.otherInformation || {};
    }
}
