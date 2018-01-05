import { Injectable, Inject } from '@angular/core';

import * as CryptoJS from 'crypto-js';

@Injectable()
export class UserService {
    constructor(@Inject('dataBaseUserService') private dataBaseUserService: any, @Inject('helperService') private helperService: any) {

    }

    getUserData(id: string = null) {
        if (!id) {
            id = this.helperService.readStorage('auth-token').id;
        }

        return this.dataBaseUserService.get(id);
    }

    checkMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: any) => {
            let passwordInput: any = group.get(passwordKey), passwordConfirmationInput: any = group.get(passwordConfirmationKey);
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({notEquivalent: true})
            } else {
                return passwordConfirmationInput.setErrors(null);
            }
        }
    }

    updateUserData(name: string = null, id: string = null, data: Object = null) {
        if (!name && !id && !data) { return null };

        data = this.helperService.cleanData(data);

        let updateData: Object = {};
        switch (name) {
            case 'profile':
                updateData['otherInformation'] = data;
                updateData['otherInformation']['birthDate'] = (updateData['otherInformation']['birthDate'] instanceof Date) ? this.helperService.formatDate(updateData['otherInformation']['birthDate']) : updateData['otherInformation']['birthDate'];
            break;

            case 'account':
                updateData['password'] = data['password'];
                updateData['hashPassword'] = CryptoJS.MD5(data['confirmPassword'].trim()).toString();
            break;

            default:
                updateData = data;
            break;
        }

        return this.dataBaseUserService.put(id, updateData).then(result => {
            return (result.ok);
        }, error => {
            return false;
        });
    }
}
