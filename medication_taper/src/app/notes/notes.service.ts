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

  public async getAllNotesForPersonOnDay( datetime : Date){
    let x = await this.httpClient.get<INotes[]>( 
      this.apiUrls.GetApiURL()+"Api/Notes/Notes",
        
        { 
          params: 
          {
            
              "fromDate" : new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate()).toISOString(),
              "toDate" : new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate(),23,59,59 ).toISOString()
            
          }
        }
        
        
    ).toPromise();
    return x;
  }

  public AddNote(datetime : Date, text : string, behaviorChange : boolean){
    this.httpClient.post<number>( 
      this.apiUrls.GetApiURL()+"Api/Notes/Add",
      <INote>{ 
        dateTime : new Date(datetime),
        NoteText : text,
        BehaviorChange : behaviorChange
        }
    ).toPromise().then( (n) => { console.log(`written note with id ${n}`); });
  }

  public DeleteNote(id : number){
    this.httpClient.post<number>( 
      this.apiUrls.GetApiURL()+"Api/Notes/Delete/"+id, {})
      .toPromise()
      .then ( (n) => { console.log(`deleted note with id ${n}`)});
    }

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
}

export interface NotesSearchRequest {
  FromDate: Date;
  ToDate: Date;
}

export interface INote {
  dateTime: Date;
  NoteText: string;
  BehaviorChange : boolean;
}