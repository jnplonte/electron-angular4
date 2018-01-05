import { Injectable, Inject } from '@angular/core';
import { DataBaseService } from './database.service';

// import * as CryptoJS from 'crypto-js';
// import { userModel } from './../../models/user.model';

@Injectable()
export class DataBaseUserService extends DataBaseService {

    private isInstantiated: boolean = false;

    constructor(@Inject('configService') configService: any) {
        super();

        if (!this.isInstantiated && typeof(configService.data.dataBaseInformation) !== 'undefined' && configService.data.dataBaseInformation.hasOwnProperty('user')) {
            this.DatabaseInformation = configService.data.dataBaseInformation;

            this.Database = configService.data.dataBaseInformation['user'];

            this.isInstantiated = true;
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
}
