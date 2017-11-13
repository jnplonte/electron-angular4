import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let queryParams: Object = {};

        if (localStorage.getItem('auth-token')) {
            return true;
        }

        if (state.url !== '/') {
            queryParams = { queryParams: { returnUrl: state.url }};
        }

        this.router.navigate(['/log-in'], queryParams);
        return false;
    }
}
