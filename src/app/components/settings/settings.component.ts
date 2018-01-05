import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit {
    profileForm: FormGroup;
    accountForm: FormGroup;

    userData: Object = {};

    loading: boolean = false;

    maxDate: Date = new Date();

    constructor(private formBuilder: FormBuilder, @Inject('configService') private configService: any, @Inject('alertService') private alertService: any, @Inject('userService') private userService: any,  @Inject('helperService') private helperService: any) {

    }

    private generateProfileForm(otherInformation: Object = {}) {
        const EMAIL_PATTERN: RegExp = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        this.profileForm = this.formBuilder.group({
            companyName: new FormControl({value: otherInformation['companyName'] || '', disabled: true}, [<any>Validators.required]),
            position: new FormControl({value: otherInformation['position'] || '', disabled: true}, [<any>Validators.required]),

            firstName: new FormControl(otherInformation['firstName'] || '', [<any>Validators.required]),
            lastName: new FormControl(otherInformation['lastName'] || '', [<any>Validators.required]),
            birthDate: new FormControl(new Date(otherInformation['birthDate'] || ''), [<any>Validators.required]),

            emailAddress: new FormControl(otherInformation['emailAddress'] || '', [<any>Validators.required, <any>Validators.pattern(EMAIL_PATTERN)]),
            contactNumber: new FormControl(otherInformation['contactNumber'] || '', [<any>Validators.required, <any>Validators.min(999999)]),
            address: new FormControl(otherInformation['address'] || '', [<any>Validators.required, <any>Validators.minLength(10)])
        });
    }

    private generateAccountForm(userData: Object = {}) {
        this.accountForm = this.formBuilder.group({
            username: new FormControl({value: userData['username'] || '', disabled: true}, [<any>Validators.required]),

            password: new FormControl('', [<any>Validators.required, <any>Validators.minLength(8)]),
            confirmPassword: new FormControl('', [<any>Validators.required, <any>Validators.minLength(8)])
        }, {
            validator: this.userService.checkMatchingPasswords('password', 'confirmPassword')
        });
    }

    ngOnInit() {
        this.userData = this.helperService.readStorage('auth-token') || {};

        this.generateProfileForm({'companyName': this.configService.data.companyName});
        this.generateAccountForm(this.userData);

        this.userService.getUserData(this.userData['id']).then(result => {
            result['otherInformation']['birthDate'] = new Date(result['otherInformation']['birthDate'] || '');
            this.profileForm.patchValue(result['otherInformation']);
        });
    }

    isValid(name: string = null, form: any = null) {
        if (name && form && form.get(name).touched) {
            return form.get(name).valid;
        }
        return true;
    }

    onUpdateSettings(name: string = null, form: any = null) {
        if (name && form && form.valid) {
            this.loading = true;
            return this.userService.updateUserData(name, this.userData['id'], form.value).then(results => {
                if (results) {
                    if (name === 'account') {
                        this.accountForm.markAsPristine();
                        this.accountForm.markAsUntouched();
                        this.accountForm.patchValue({'password': '', 'confirmPassword': ''});
                        Object.keys(this.accountForm.controls).forEach(key => {
                            this.accountForm.controls[key].setErrors(null)
                        });
                    }
                    this.alertService.success('update success');
                } else {
                    this.alertService.error('update failed');
                }
                this.loading = false;
            });
        }
    }
}
