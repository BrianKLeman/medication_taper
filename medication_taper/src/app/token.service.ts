import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlsService } from 'src/urls.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private httpClient : HttpClient, private urlsService : UrlsService) { 
    this.token = JSON.parse(localStorage.getItem("token") as string);
  }

  public async GetToken(userID : string, password : string){
    let x = await this.httpClient.get<IToken>(this.urlsService.GetApiURL()+"/api/Auth/Token").toPromise();
    if(x){
      this.token = x;  
      
      if(this.token.Token && this.token.Token.length > 0)
        localStorage.setItem("token", JSON.stringify(this.token));
      
    }
    return x;
  }

  public get Token(){
    let text = localStorage.getItem("token");
    if(text && text.length > 0)
      this.token = JSON.parse(text);
    return this.token;
  }
  private token : IToken | null = {UserID : "", Token : ""};
}

export interface IToken{  
    UserID : string;
    Token : string;
}