import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCredentialsService } from '../user-credentials.service';
import { UrlsService } from 'src/urls.service';
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private httpClient : HttpClient, 
    private user : UserCredentialsService,
    private apiUrls : UrlsService) { 

  }

  public async getAllNotesForPerson(){
    let x = await this.httpClient.get<INotes[]>( this.apiUrls.GetApiURL()+"Api/Notes").toPromise();
    return x;
  }

  public async getAllNotesForLast7Days(){
    let datetime = new Date(Date.now());
    let toDate = `${datetime.getFullYear()}-${(datetime.getMonth()+1).toString().padStart(2,"0")}-${(datetime.getDate()).toString().padStart(2, "0")}T23:59:59`;
    let fromDate = `${datetime.getFullYear()}-${(datetime.getMonth()+1).toString().padStart(2,"0")}-${(datetime.getDate()-7).toString().padStart(2, "0")}T00:00:00`
    let x = await this.httpClient.get<INotes[]>( 
      this.apiUrls.GetApiURL()+"Api/Notes/Notes",
        
        { 
          params: 
          {
            
              "fromDate" : fromDate,
              "toDate" : toDate
            
          }
        }
        
        
    ).toPromise();
    return x;
  }

  public async getAllNotesForPersonOnDay( datetime : Date){
    let x = await this.httpClient.get<INotes[]>( 
      this.apiUrls.GetApiURL()+"Api/Notes/Notes",
        
        { 
          params: 
          {
            
              "fromDate" : `${datetime.getFullYear()}-${(datetime.getMonth()+1).toString().padStart(2,"0")}-${(datetime.getDate()).toString().padStart(2, "0")}T00:00:00`,
              "toDate" : `${datetime.getFullYear()}-${(datetime.getMonth()+1).toString().padStart(2,"0")}-${(datetime.getDate()).toString().padStart(2, "0")}T23:59:59`
            
          }
        }
        
        
    ).toPromise();
    return x;
  }

  public async getAllNotesEntity( tableName : string, entityID : number){
    let x = await this.httpClient.get<INotes[]>( 
      this.apiUrls.GetApiURL()+"Api/Notes/Notes",
        
        { 
          params: 
          {
            
              "tableName" : tableName,
              "entityID" : entityID            
          }
        }
        
        
    ).toPromise();
    return x;
  }

  public AddNote(datetime : Date, text : string, behaviorChange : boolean, displayAsHTML : boolean){
    this.httpClient.post<number>( 
      this.apiUrls.GetApiURL()+"Api/Notes/Add",
      <INote>{ 
        dateTime : new Date(datetime),
        NoteText : text,
        BehaviorChange : behaviorChange,
        DisplayAsHTML : displayAsHTML
        }
    ).toPromise().then( (n) => { console.log(`written note with id ${n}`); });
  }

  public UpdateNote(note : INotes){
    this.httpClient.post<number>( 
      this.apiUrls.GetApiURL()+"Api/Notes/Update",
      <INote>{ 
        dateTime : new Date(note.RecordedDate),
        NoteText : note.Text,
        BehaviorChange : note.BehaviorChange,
        NoteID : note.NoteID,
        DisplayAsHTML : note.DisplayAsHTML
        }
    ).toPromise().then( (n) => { console.log(`written note with id ${n}`); });
  }

  public async DeleteNote(id : number){
    let x = await this.httpClient.post<number>( 
      this.apiUrls.GetApiURL()+"Api/Notes/Delete/"+id, {})
      .toPromise();
    }

  //public async SaveNoteLink()

}

export interface INotes {
  NoteID: number;
  PersonID: number;
  Text: string;
  CreatedDate: string;
  CreatedUser: string;
  UpdatedUser: string;
  UpdatedDate: string;
  RecordedDate: string;
  BehaviorChange : boolean;
  DisplayAsHTML : boolean;
  Link : boolean;
}

export interface NotesSearchRequest {
  FromDate: Date;
  ToDate: Date;
}

export interface INote {
  dateTime: Date;
  NoteText: string;
  BehaviorChange : boolean;
  NoteID : number;
  DisplayAsHTML : boolean;
}