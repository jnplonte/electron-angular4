import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.scss']
})

export class LogInComponent implements OnInit {
    loading: boolean = false;
    model: Object = {};

    constructor(@Inject('authenticationService') private authenticationService: any, @Inject('alertService') private alertService: any, private router: Router) {

    }

    ngOnInit() {
        this.authenticationService.logout();
    }

    // onSync() {
    //     this.authenticationService.sync();
    // }

    onLogInSubmit() {
        this.loading = true;

        this.authenticationService.login(this.model['username'], this.model['password']).then( result => {
            if (result) {
                this.router.navigate(['/']);
            } else {
                this.alertService.error('Invalid Username or Password');
                this.loading = false;
            }
        });
    }
}
