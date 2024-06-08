import { Component } from '@angular/core';
import { UserCredentialsService } from '../user-credentials.service';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent {

  public constructor(private userCred : UserCredentialsService){

    this.userID = this.userCred.getPassword();
    this.password = this.userCred.getUserID();
  }

  public UpdateCredentials(){
    this.userCred.set( this.userID, this.password);
  }

  public set UserID(arg : string)  {
    this.userID = arg;
  }
  public get UserID(){
    return this.userID;
  }

  public set Password(arg : string)
  {
    this.password = arg;
  }
  public get Password(){
    return this.password;
  }
  private userID = "READONLY";
  private password : string = "";
}
