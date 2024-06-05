import { Component, Input } from '@angular/core';
import { INotes, NotesService } from '../notes/notes.service';

@Component({
  selector: 'app-notes-table',
  templateUrl: './notes-table.component.html',
  styleUrls: ['./notes-table.component.css']
})
export class NotesTableComponent {

  constructor(private notesService : NotesService){

  }

  @Input()
  public datetime : Date | null = null; 

  @Input()
  public get showNotes(){
    return this.show;
  }

  public set showNotes(arg : boolean){
    this.show = arg;
    if(this.show){
      if(this.datetime){
        this.notesService.getAllNotesForPersonOnDay(new Date(this.datetime)).then( 
          (v : INotes[] | undefined) => {
            this.notes = v ?? [];
          }
        );
      }
    }
  }
  private show = false;

  public notes : INotes[] = [];
}
