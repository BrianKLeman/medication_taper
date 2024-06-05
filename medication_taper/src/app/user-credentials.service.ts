import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserCredentialsService {

  constructor() { }
  private prompted = false;

  public getPassword() : string {
    if(this.password == "" && !this.prompted){
      let p = prompt("Please enter password!");
      if(p)
        this.password = p;
      this.prompted = true;
    }
      
    return this.password;
  }

  private password : string = "";

  public getPersonID(){
    return 1;
  }
}
