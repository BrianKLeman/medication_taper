import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTab } from '@angular/material/tabs';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { IToken, TokenService } from './token.service';
import { UserCredentialsService } from './user-credentials.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'medication_taper';

  constructor(    
    private dialog : MatDialog,
    private tokenService : TokenService,
    private userCredentials : UserCredentialsService
  ){
    this.token = this.tokenService.Token;
  }

  public showAuthorise(){
    let afterClosed = this.dialog.open(AuthDialogComponent).afterClosed().toPromise();
    afterClosed.then( async (v : any) => {
      let r = await this.tokenService.GetToken(this.userCredentials.getUserID(), this.userCredentials.getPassword());
      if(r)
        this.token = r;
      else
        this.token = { UserID : "Unspecified", Token : ""};
    } )
  }

  public token : IToken | null = null;

  public get UserID(){
    let token = this.token?.Token;
    return (token != "" && token != null) ? this.token?.UserID : "Not Logged In";
  }

  public get HasUserID(){
    return this.token?.Token != "" &&  this.token?.Token != null;
  }

  public Logout(){
    this.token = null;
    this.tokenService.Logout();
  }
}
