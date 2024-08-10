import { Injectable } from '@angular/core';
import { UserCredentialsService } from '../user-credentials.service';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from 'src/urls.service';

@Injectable({
  providedIn: 'root'
})
export class SleepsService {
  constructor(private httpClient : HttpClient, 
    private user : UserCredentialsService,
    private apiUrls : UrlsService) { 

  }

  public async getAllForPerson(){
    let x = await this.httpClient.get<ISleeps[]>( this.apiUrls.GetApiURL()+"Api/Sleeps").toPromise();
    return x;
  }
}

export interface ISleeps{
  SleepID : number,
  Hours : null | number,
  PersonID: 1,
  CreatedDate: Date | string,
  FromDate : Date | string | null,
  ToDate: Date | string | null
}