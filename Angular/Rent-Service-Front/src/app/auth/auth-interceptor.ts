import { AuthService } from './auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import appstore from '../reducers/appstore';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LOGOUT } from '../reducers/appactions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private router:Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler  ){
    const authToken = appstore.getState().token;
    const authRequest = req.clone({
      headers:  req.headers.set("authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest).pipe(
      tap(
        event=>{},
        err=>{
          if(err.error.auth==false){
            appstore.dispatch({type:LOGOUT});
            this.router.navigate(['/login']);
          }
        }
      )
    );
  }
}