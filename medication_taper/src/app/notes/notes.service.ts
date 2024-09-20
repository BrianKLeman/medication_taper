import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCredentialsService } from '../user-credentials.service';
import { UrlsService } from 'src/urls.service';
import { TimezonesService } from '../timezones.service';
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private httpClient : HttpClient, 
    private user : UserCredentialsService,
    private apiUrls : UrlsService,
    private timeService : TimezonesService) { 

  }

  public async getAllNotesForPerson(){
    let x = await this.httpClient.get<INotes[]>( this.apiUrls.GetApiURL()+"Api/Notes").toPromise();
    return x;
  }

  public async getAllNotesForLast7Days(){
    let datetime = new Date(Date.now());
    let fromDate = this.timeService.subtractDaysFromDateTime(7, datetime).toISOString();
    datetime.setHours(23,59,59,999);
    let toDate = datetime.toISOString();
    let x = await this.httpClient.get<INotes[]>( 
      this.apiUrls.GetApiURL()+"Api/Notes",
        
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
    datetime.setHours(0,0,0,0);
    let fromDate = datetime.toISOString();
    datetime.setHours(23,59,59,999);
    let toDate = datetime.toISOString();
    let x = await this.httpClient.get<INotes[]>( 
      this.apiUrls.GetApiURL()+"Api/Notes",
        
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

  public async getAllNotesEntity( tableName : string, entityID : number){
    let x = await this.httpClient.get<INotes[]>( 
      this.apiUrls.GetApiURL()+"Api/Notes",
        
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

  public AddNote(datetime : Date, text : string, behaviorChange : boolean, displayAsHTML : boolean, tableName : string, entityID : number){
    this.httpClient.post<number>( 
      this.apiUrls.GetApiURL()+"Api/Notes",
      <INote>{ 
        dateTime : new Date(datetime),
        NoteText : text,
        BehaviorChange : behaviorChange,
        DisplayAsHTML : displayAsHTML,
        entityID : entityID,
        tableName : tableName
        }
    ).toPromise().then( (n) => { console.log(`written note with id ${n}`); });
  }

  public UpdateNote(note : INotes){
    this.httpClient.put<number>( 
      this.apiUrls.GetApiURL()+"Api/Notes",
      <INote>{ 
        dateTime : new Date(note.RecordedDate),
        NoteText : note.Text,
        BehaviorChange : note.BehaviorChange,
        NoteID : note.Id,
        DisplayAsHTML : note.DisplayAsHTML
        }
    ).toPromise().then( (n) => { console.log(`written note with id ${n}`); });
  }

  public async DeleteNote(id : number){
    let x = await this.httpClient.delete<number>( 
      this.apiUrls.GetApiURL()+"Api/Notes/"+id, {})
      .toPromise();
    }

  //public async SaveNoteLink()

}

export interface INotes {
  Id: number;
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
  tableName : string;
  entityID : number;
}

export interface INotesDetails{  
    datetime: Date,
    note : INotes | null,
    entity : string,
    entity_id : number  
}