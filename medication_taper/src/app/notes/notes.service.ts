import { HttpClient } from '@angular/common/http';
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

  public async getAllNotesForPerson(personID : number){
    let x = await this.httpClient.get<INotes[]>( this.apiUrls.GetApiURL()+"Api/Notes").toPromise();
    return x;
  }

  public async getAllNotesForPersonOnDay( datetime : Date){
    let x = await this.httpClient.post<INotes[]>( 
      this.apiUrls.GetApiURL()+"Api/Notes/",
      <NotesSearchRequest>{ 
        PersonID : this.user.getPersonID(), 
        FromDate : new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate()),
        ToDate : new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate(),23,59,59 ),
        Password : await this.user.getPassword()}
          ).toPromise();
    return x;
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
}

export interface NotesSearchRequest {
  PersonID: number;
  FromDate: Date;
  ToDate: Date;
  Password: string;
}