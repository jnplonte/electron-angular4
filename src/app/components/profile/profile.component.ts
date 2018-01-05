import { Component, OnInit, Inject } from '@angular/core';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    userData: Object = {};

    constructor(@Inject('configService') private configService: any,  @Inject('helperService') private helperService: any) {

    }

    ngOnInit() {
        this.userData = this.helperService.readStorage('auth-token') || {};
    }

}
