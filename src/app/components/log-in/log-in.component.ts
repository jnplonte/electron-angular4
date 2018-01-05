import { Component, OnInit, Inject, Renderer } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.scss']
})

export class LogInComponent implements OnInit {
    loading: boolean = false;
    syncing: boolean = false;

    model: Object = {};
    companyName: string = '';

    isOnline: boolean = navigator.onLine;

    constructor(renderer: Renderer, @Inject('configService') private configService: any, @Inject('authenticationService') private authenticationService: any, @Inject('alertService') private alertService: any, private router: Router) {
        this.companyName = configService.data.companyName;

        renderer.listenGlobal('window', 'online', () => {
            this.isOnline = true;
        });

        renderer.listenGlobal('window', 'offline', () => {
            this.isOnline = false;
        });
    }

    ngOnInit() {
        this.authenticationService.logout();
    }

    onSync() {
        this.syncing = true;

        this.authenticationService.sync('user').then(result => {
            if (result) {
                this.alertService.success('sync success');
            } else {
                this.alertService.error('sync failed');
            }
            this.syncing = false;
        });
    }

    onLogIn() {
        this.loading = true;

        this.authenticationService.login(this.model['username'], this.model['password']).then(result => {
            if (result) {
                this.router.navigate(['/']).then(() => {
                    this.alertService.success('login success');
                });
            } else {
                this.alertService.error('invalid username or password');
                this.loading = false;
            }
        });
    }
}
