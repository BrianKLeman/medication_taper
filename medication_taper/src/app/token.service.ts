import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlsService } from 'src/urls.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private httpClient : HttpClient, private urlsService : UrlsService) { }

  public async GetToken(userID : string, password : string){
    let x = await this.httpClient.get<IToken>(this.urlsService.GetApiURL()+"/api/Auth/Token").toPromise();
    if(x)
      this.token = x;
    return x;
  }

  public get Token(){
    return this.token;
  }
  private token : IToken | null = null;
}

export interface IToken{  
    UserID : string;
    Token : string;
}