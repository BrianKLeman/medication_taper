import { Component, Inject } from '@angular/core';
import { INote, INotes, NotesService } from './notes.service';
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
          datetime: Date,
          note : INotes | null
        },
    private service : NotesService,
    private timeService : TimezonesService){

      if(!data.note){
        let now = new Date(Date.now());
        this.currentNote = this.CreateNewNote(now);
      } else {
        this.currentNote = data.note;
      }
      
  }

  private CreateNewNote(now : Date) : INotes{
    let ct = now;
    ct.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
    let currentNote = <INotes> 
    { 
      RecordedDate : ct.toISOString(), 
      NoteID : 0, 
      PersonID : 0, 
      Text : "",
      BehaviorChange : false,
      CreatedUser : "",
      CreatedDate : ct.toISOString(),
      UpdatedUser : "",
      UpdatedDate : ""
    };
    return currentNote;
  }
  public SaveNote(){

    if(this.currentNote?.NoteID == 0)
      this.service.AddNote(new Date(this.currentNote.RecordedDate), this.currentNote.Text, this.currentNote.BehaviorChange);
    else
      this.service.UpdateNote(this.currentNote);
  }  
  
  public SaveLink(noteID : number, tableName : string, entity_id : number){

  }
  currentNote : INotes;

  option = ""; // used for note type links.
}
