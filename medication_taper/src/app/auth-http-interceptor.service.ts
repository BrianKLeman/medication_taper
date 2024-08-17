import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCredentialsService } from './user-credentials.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptorService implements HttpInterceptor {

  constructor(private user : UserCredentialsService, private token : TokenService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let c : any = {};
    let token = this.token.Token;   
    if(token && token.Token.length > 0){
        c = req.clone( { headers: 
        req.headers.append("Auth-Token", token.Token)
        });
    }
    else {
        c = req.clone( { headers: 
          req.headers.append("UserID",this.user.getUserID())
          .append("Password", this.user.getPassword())
          }
        );
    }

    return next.handle(c);
  }
}
