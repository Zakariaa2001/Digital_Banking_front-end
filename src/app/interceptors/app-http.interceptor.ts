import { HttpInterceptorFn } from '@angular/common/http';
import { AuthServiceService } from '../services/auth-service.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  let authService = inject(AuthServiceService)
  //console.log(req.url)
  if(!req.url.includes("/auth/login")) {
    let newRequest = req.clone({
      headers : req.headers.set('Authorization','Bearer '+authService.accesToken),
    })
    return next(newRequest).pipe(
      catchError(err => {
        if(err.status == 401){
          authService.logout();
        }
        return throwError(err.message)
      })
    );
  } else {
    return next(req);

  }
};
