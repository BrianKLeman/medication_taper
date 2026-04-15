import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlsService } from 'src/urls.service';
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private httpClient : HttpClient, 
    private apiUrls : UrlsService) { 

  }

  public async getAllNotesForPerson(){
    let x = await this.httpClient.get<INotes[]>( this.apiUrls.GetApiURL()+"Api/Notes").toPromise();
    return x;
  }

  public async getAllNotesForRange(fromDate : string, toDate : string){
    
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
    let today = datetime;
    
    let offsetMinutes = today.getTimezoneOffset()
    today.setHours(today.getHours()-offsetMinutes/60)
    let json =  <INote>{ 
        dateTime : today,
        NoteText : text.trim() == "" ? "unset" : text,
        BehaviorChange : behaviorChange,
        DisplayAsHTML : displayAsHTML,
        entityID : entityID,
        tableName : tableName
        }
    this.httpClient.post<number>( 
      this.apiUrls.GetApiURL()+"Api/Notes",
     json
    ).toPromise().then( (n) => { console.log(`written note with id ${n}`); });
  }

  public UpdateNote(note : INotes){
    let today = new Date();
    
    let offsetMinutes = today.getTimezoneOffset()
    today.setHours(today.getHours()-offsetMinutes/60)
    let json = <INote>{ 
        dateTime : today,
        NoteText : note.Text.trim() == "" ? "unset" : note.Text,
        BehaviorChange : note.BehaviorChange,
        NoteID : note.Id,
        DisplayAsHTML : note.DisplayAsHTML
        };
    console.log(JSON.stringify(json));
    this.httpClient.put<number>( 
      this.apiUrls.GetApiURL()+"Api/Notes",
      json
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