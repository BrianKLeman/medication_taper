import { Component, Inject, Input } from '@angular/core';
import { INote, INotes, NotesService } from './notes.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimezonesService } from '../timezones.service';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css'],
    standalone: false
})
export class NotesComponent {

  public constructor(@Inject(MAT_DIALOG_DATA) 
        public data: 
        {
          datetime: Date,
          note : INotes | null,
          entity : string,
          entity_id : number
        },
    private service : NotesService,
    private timeService : TimezonesService){

      if(!data.note){
        let now = new Date(Date.now());
        this.entityID = data.entity_id;
        this.tableName = data.entity;
        this.currentNote = this.CreateNewNote(now);
      } else {
        this.currentNote = data.note;
        if(this.currentNote.BehaviorChange != true)
          this.currentNote.BehaviorChange = false;
        // I need to correct the date time because the server is adjusting it.
        this.date = this.currentNote.RecordedDate.split("T")[0];
        this.time = this.currentNote.RecordedDate.split("T")[1].substring(0,5);
      }
      
  }

  private CreateNewNote(now : Date) : INotes{
    
    this.setDateAndTime(now);
    let currentNote = <INotes> 
    { 
      RecordedDate : now.toISOString(), 
      Id : 0, 
      PersonID : 0, 
      Text : "",
      BehaviorChange : false,
      CreatedUser : "",
      CreatedDate : now.toISOString(),
      UpdatedUser : "",
      UpdatedDate : "",
      DisplayAsHTML : false
    };
    return currentNote;
  }
  public SaveNote(){
    this.updateNote(this.currentNote);
    if(this.currentNote?.Id == 0)
      this.service.AddNote(new Date(this.currentNote.RecordedDate), this.currentNote.Text, this.currentNote.BehaviorChange, this.currentNote.DisplayAsHTML, this.tableName, this.entityID);
      
    else
      this.service.UpdateNote(this.currentNote);
  }  
  
  date : string = "";
  time : string = "";
  currentNote : INotes;

  public changeDate(d : Date){
    this.date = d.toISOString().split('T')[0];
  }
  option = ""; // used for note type links.

  private setDateAndTime(d : Date){
        this.date = d.toISOString().split("T")[0];
        this.time = d.toTimeString().substring(0,5);
  }

  private updateNote(n : INotes){    
    n.RecordedDate = `${this.date}T${this.time}:00`;
  }

  private entityID = -1;
  private tableName = "";

}
