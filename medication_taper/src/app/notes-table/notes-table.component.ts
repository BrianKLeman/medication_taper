import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { INotes, NotesService } from '../notes/notes.service';
import { TimezonesService } from '../timezones.service';
import { MatDialog } from '@angular/material/dialog';
import { NotesComponent } from '../notes/notes.component';
import { LinkNoteToComponent } from '../link-note-to/link-note-to.component';

@Component({
  selector: 'app-notes-table',
  templateUrl: './notes-table.component.html',
  styleUrls: ['./../app.component.css']
})
export class NotesTableComponent implements OnInit, AfterViewInit{

  constructor(private notesService : NotesService,
            private timeService : TimezonesService,
            private dialog : MatDialog
  ){
  }

  async ngOnInit() {
    await this.refreshNotes();
  }

  async ngAfterViewInit() {
    await this.refreshNotes();
  }

  @Input() public last7Days = false;
  @Input()
  public entity : number = 0;

  @Input()
  public tableName = "";


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

  @Input()
  public show = false;

  public notes : INotes[] = [];

  public async deleteNote(noteID : number){
    let x = await this.notesService.DeleteNote(noteID);
    setTimeout(async () => { await this.refreshNotes(); }, 500);
  }

  public adjustForTimezone(date : string){
    return this.timeService.adjustForTimezoneStr(date);
  }

  public async refreshNotes(){
    if(this.last7Days){
      let x = await this.notesService.getAllNotesForLast7Days();
      this.notes = x ?? [];
      console.log("Refreshed Notes "+ x?.length);
      return x?.length ?? 0;
    }
    else if(this.datetime){
      let x = await this.notesService.getAllNotesForPersonOnDay(new Date(this.datetime));
      this.notes = x ?? [];
      console.log("Refreshed Notes "+ x?.length);
      return x?.length ?? 0;
    } else {
      let x = await this.notesService.getAllNotesEntity(this.tableName, this.entity);
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
        console.log('returned' + count); 
      }, 
      500);
    let count = await this.refreshNotes();
  }  
  public async editNote(note : INotes){
    let d = this.datetime === typeof(Date) ? this.datetime : new Date(this.datetime as string);
    let x = await this.dialog.open(NotesComponent, { data : {datetime : d, note : note}}).afterClosed().toPromise();
    
    setTimeout(async () => 
    { 
      await this.refreshNotes(); 
      console.log('returned' + count); 
    }, 500);
    let count = await this.refreshNotes();
  }

  public async LinkNotes(){
    let ids = this.notes.flatMap( ( val) => {
      if(val.Link)
        return val.NoteID;
      else 
        return -1;
    }).filter( (v) => {
      return v > 0;
    })
    let x = await this.dialog.open(LinkNoteToComponent, { data : { noteIDs : ids}}).afterClosed().toPromise();
    
    setTimeout(async () => 
    { 
      await this.refreshNotes(); 
      console.log('returned' + count); 
    }, 500);
    let count = await this.refreshNotes();
  }
}
  

