import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
    isAdmin: boolean = false;
    loading: boolean = false;
    model: Object = {};

    constructor(@Inject('dataBaseUserService') private dataBaseUserService: any, @Inject('authenticationService') private authenticationService: any, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit() {
        this.authenticationService.logout();

        this.route.queryParams.subscribe( params => {
            if (typeof(params.page) !== 'undefined' && params.page === 'admin') {
                // this.dataBaseUserService.checkAdminExists();
                this.isAdmin = true;
            } else {
                this.isAdmin = false;
            }
        });
    }

    get internetError() {
        if (this.isAdmin) {
            return navigator.onLine;
        }else {
            return true;
        }
    }

    onLogInSubmit() {
        // this.loading = true;

        // this.pouchService.signup(this.model['username'], this.model['password']).then( result => {
        //     if (typeof(result.pull) !== 'undefined' && typeof(result.push) !== 'undefined') {
        //         console.log('success');
        //     } else {
        //         console.log('failed');
        //         this.loading = false;
        //     }
        // });


        // this.pouchService.login(this.model['username'], this.model['password']).then( result => {
        //     console.log(result);
        //     this.loading = false;
        // });

        // this.authenticationService.login(this.model['username'], this.model['password'], this.isAdmin).subscribe(
        //     data => {
        //         this.router.navigate(['/']);
        //     },
        //     error => {
        //         // this.alertService.error(error);
        //         console.log('failed');
        //         this.loading = false;
        //     }
        // );
    }
}
