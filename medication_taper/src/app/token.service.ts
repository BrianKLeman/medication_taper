import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlsService } from 'src/urls.service';

const TOKEN = "token";
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private httpClient : HttpClient, private urlsService : UrlsService) { 
    this.token = JSON.parse(localStorage.getItem(TOKEN) as string);
  }

  public async GetToken(userID : string, password : string){
    let x = await this.httpClient.get<IToken>(this.urlsService.GetApiURL()+"/api/Auth/Token").toPromise();
    if(x){
      this.token = x;  
      
      if(this.token.Token && this.token.Token.length > 0)
        localStorage.setItem(TOKEN, JSON.stringify(this.token));
      
    }
    return x;
  }

  public get Token(){
    let text = localStorage.getItem(TOKEN);
    if(text && text.length > 0)
      this.token = JSON.parse(text);
    return this.token;
  }
  private token : IToken | null = {UserID : "", Token : ""};

  public Logout(){
    this.token = null;
    localStorage.removeItem(TOKEN);
  }
}

export interface IToken{  
    UserID : string;
    Token : string;
}