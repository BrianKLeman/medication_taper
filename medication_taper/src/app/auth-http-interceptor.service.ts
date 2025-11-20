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
    const authHeader = "Authorization";
    const basic = "basic";
    let c : any = {};
    let token = this.token.Token;   
    if(token != undefined && token != null && token.Token.length > 0){
        c = req.clone( { headers: 
        req.headers.append(authHeader, `${basic} ${btoa(token.Token)}`)
        });
    }
    else {
        c = req.clone( { headers: 
          req.headers.append(
            authHeader,
            `${basic} ${btoa(this.user.getUserID()+':'+this.user.getPassword())}`
          )
          }
        );
    }

    return next.handle(c);
  }
}
