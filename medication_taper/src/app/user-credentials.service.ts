import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserCredentialsService {

  constructor() { }
  private prompted = false;

  public getPassword() : string {
    
      
    return this.password;
  }

  public setPassword(arg : string){
    this.password = arg;
  }
  private password : string = "";

  public getUserID(){
    return this.userID;
  }

  public setUserID(arg : string){
    this.userID = arg;
  }

  public getAuthHeaders(){
    return { 
      "UserID" : this.getUserID(),
      "Password" : this.getPassword()
    }
  }

  public set(userID : string, password : string){
    this.userID = userID;
    this.password = password;
  }

  private userID : string = "READONLY";
  
}
