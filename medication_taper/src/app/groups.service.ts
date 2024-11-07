import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCredentialsService } from './user-credentials.service';
import { UrlsService } from 'src/urls.service';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private httpClient : HttpClient, 
    private user : UserCredentialsService,
    private apiUrls : UrlsService) { 
  }

  public async getAllGroupsForPerson(){
    return await this.httpClient.get<IGroups[]>( this.apiUrls.GetApiURL()+"Api/Groups").toPromise();
  }
}

export interface IGroups
{
    Id : number;

    PersonID : number;
    
    Name : string;
}