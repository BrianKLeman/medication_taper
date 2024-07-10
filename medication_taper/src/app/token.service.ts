import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private httpClient : HttpClient) { }

  public async GetToken(userID : string, password : string){
    //let x = await this.httpClient.get()
    return "";
  }
}
