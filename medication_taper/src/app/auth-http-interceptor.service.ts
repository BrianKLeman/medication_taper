import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCredentialsService } from './user-credentials.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptorService implements HttpInterceptor {

  constructor(private user : UserCredentialsService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let c = req.clone( { headers: 
    req.headers.append("UserID",this.user.getUserID())
    .append("Password", this.user.getPassword())}
  );

    return next.handle(c);
  }
}
