import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { INotes, NotesService } from '../notes/notes.service';
import { TimezonesService } from '../timezones.service';
import { MatDialog } from '@angular/material/dialog';
import { NotesComponent } from '../notes/notes.component';
import { LinkNoteToComponent } from '../link-note-to/link-note-to.component';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-notes-table',
  templateUrl: './notes-table.component.html',
  styleUrls: ['./../app.component.css', './notes-table.component.css']
})
export class NotesTableComponent implements OnInit, AfterViewInit{

  constructor(private notesService : NotesService,
            private timeService : TimezonesService,
            private dialog : MatDialog,            
            private tokenService : TokenService
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

  @Input()
  public showForm = false;
  public async refreshNotes(){
    if(this.showForm){
      let x = await this.notesService.getAllNotesForRange(this.fromDate, this.toDate);
      this.notes = x ?? [];
      console.log("Refreshed Notes "+ x?.length);
      return x?.length ?? 0;
    } else if(this.last7Days){
      let datetime = new Date(Date.now());
      datetime.setHours(0,0,0,0);
      let fromDate = this.timeService.subtractDaysFromDateTime(7, datetime).toISOString();
      datetime.setHours(23,59,59,999);
      let toDate = datetime.toISOString();
      let x = await this.notesService.getAllNotesForRange(fromDate, toDate);
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
    let x = await this.dialog.open(NotesComponent, { data : 
      {datetime : d, 
        entity : this.tableName, 
        entity_id : this.entity
      }}).afterClosed().toPromise();
    
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
        return val.Id;
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

  public dateDiffIndex(i : number){
    let a = this.notes[i].RecordedDate;
    let b0 = this.notes[i+1];
    if(!b0)
      return 0;

    
    let b = b0.RecordedDate;
    return this.dateDiff(a, b);
  }

  public dateDiff(a : string, b : string){
    let c = this.adjustForTimezone(a).getDate();
    let d = this.adjustForTimezone(b).getDate();
    return c - d;
  }

  public dayOfWeek(a: string, addDays : number){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    
    return weekday[this.adjustForTimezone(a).getDay()+7+addDays];
  }

  public format(text : string, displayAsHTML : boolean)
  {
    if(displayAsHTML == false)
      return text.replace('\n', "<p>").replace('\n', "<p>");
    else 
      return text;
  }

  public get HasUserID()  {
    let token = this.tokenService.Token;
    return token?.Token != "" &&  token?.Token != null;
  }

  //#region Date Range

  fromDate : string = "";

  public changeFromDate(d : string){
    this.fromDate = d;
  }

  toDate : string = "";

  public changeToDate(d : string){
    this.toDate = d;
  }
  //#endregion
}
  

