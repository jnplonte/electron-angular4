import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, @Inject('helperService') private helperService: any) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let queryParams: Object = {};

        if (this.helperService.readStorage('auth-token')) {
            return true;
        }

        if (state.url !== '/') {
            queryParams = { queryParams: { returnUrl: state.url }};
        }

        this.router.navigate(['/log-in'], queryParams);
        return false;
    }
}
