import { Component, Inject } from '@angular/core';
import { NotesService } from './notes.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {

  public constructor(@Inject(MAT_DIALOG_DATA) 
        public data: 
        {
          datetime: Date
        },
    private service : NotesService){
      this.dt = new Date(data.datetime);
  }

  public AddNote(){
    this.service.AddNote(this.dt, this.text);
  }  
  public get Text(){
    return this.text;
  }
  public set Text(arg : string){
    this.text = arg;
  }
  private text = "";
  public get dateTime(){
    return this.dt;
  }

  public set dateTime(arg : Date){
    this.dt = arg;
  }
  private dt = new Date();

  
}
