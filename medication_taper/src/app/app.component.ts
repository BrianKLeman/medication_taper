import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'medication_taper';

  constructor(    
    private dialog : MatDialog
  ){
    
  }

  public showAuthorise(){
    this.dialog.open(AuthDialogComponent);
  }
}
