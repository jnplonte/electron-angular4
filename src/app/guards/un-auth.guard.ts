import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class UnAuthGuard implements CanActivate {

    constructor(private router: Router, @Inject('helperService') private helperService: any) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.helperService.readStorage('auth-token')) {
            return true;
        }

        this.router.navigate(['/']);
        return false;
    }
}
