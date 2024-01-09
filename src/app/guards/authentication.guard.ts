import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

export const authenticationGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  let authService = inject(AuthServiceService);
  let router = inject(Router);
  if(authService.isAuthentification == true) {
    return true;
  }else {
    router.navigateByUrl('/login');
    return false;
  }
};
