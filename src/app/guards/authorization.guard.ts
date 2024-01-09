import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { inject } from '@angular/core';

export const authorizationGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthServiceService);
  let router = inject(Router);
  if(authService.roles.includes("ROLE_admin")){
    return true;
  }else {
    router.navigateByUrl('/admin/notAuthoriezd')
    return false;
  }
};
