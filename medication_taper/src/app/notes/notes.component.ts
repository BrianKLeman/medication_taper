import { Component, Inject } from '@angular/core';
import { NotesService } from './notes.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimezonesService } from '../timezones.service';

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
    private service : NotesService,
    private timeService : TimezonesService){
      this.dt = data.datetime;
  }

  public AddNote(){
    this.service.AddNote(new Date(this.dt), this.text);
  }  
  text = "my text";
  dt = new Date(Date.now());

 
}
