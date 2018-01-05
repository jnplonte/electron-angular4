import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
    @Input() private sidenavRef: any;

    userData: Object = {};
    companyName: string = '';

    clock: Observable<any>;

    constructor(@Inject('configService') private configService: any, @Inject('alertService') private alertService: any, @Inject('authenticationService') private authenticationService: any, @Inject('helperService') private helperService: any, private router: Router) {
        this.companyName = configService.data.companyName;
        this.clock = Observable.interval(100).map(() => new Date());
    }

    ngOnInit() {
        console.log('test');
    }

    onLogOut() {
        this.authenticationService.logout();
        this.router.navigate(['/log-in']).then(() => {
            this.alertService.success('logout success');
        });
    }

    get isVisible() {
        return this.authenticationService.isLogin;
    }

    get userName() {
        return this.helperService.readStorage('auth-token').username || '';
    }
}
