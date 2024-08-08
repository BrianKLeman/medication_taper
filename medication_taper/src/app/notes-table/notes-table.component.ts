import { Component, Input } from '@angular/core';
import { INotes, NotesService } from '../notes/notes.service';
import { TimezonesService } from '../timezones.service';
import { MatDialog } from '@angular/material/dialog';
import { NotesComponent } from '../notes/notes.component';

@Component({
  selector: 'app-notes-table',
  templateUrl: './notes-table.component.html',
  styleUrls: ['./notes-table.component.css']
})
export class NotesTableComponent {

  constructor(private notesService : NotesService,
            private timeService : TimezonesService,
            private dialog : MatDialog
  ){
  }

  @Input()
  public datetime : Date | null | string = null; 

  @Input()
  public get showNotes(){
    return this.show;
  }

  public set showNotes(arg : boolean){
    this.show = arg;
    if(this.show){
      this.refreshNotes();
    }
  }
  private show = false;

  public notes : INotes[] = [];

  public async deleteNote(noteID : number){
    let x = await this.notesService.DeleteNote(noteID);
    setTimeout(async () => { await this.refreshNotes(); }, 500);
  }

  public adjustForTimezone(date : string){
    return this.timeService.adjustForTimezoneStr(date);
  }

  public async refreshNotes(){
    if(this.datetime){
      let x = await this.notesService.getAllNotesForPersonOnDay(new Date(this.datetime));
      this.notes = x ?? [];
      console.log("Refreshed Notes "+ x?.length);
      return x?.length ?? 0;
    }
    return 0;
  }

  public async addNote(){
    let d = this.datetime === typeof(Date) ? this.datetime : new Date(this.datetime as string);
    let x = await this.dialog.open(NotesComponent, { data : {datetime : d}}).afterClosed().toPromise();
    
    setTimeout(async () => 
      { 
        await this.refreshNotes(); 
        console.log('returned' + count); }, 500);
        let count = await this.refreshNotes();
      }
}
