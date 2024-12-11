import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UserCredentialsService } from './user-credentials.service';
import { UrlsService } from 'src/urls.service';

@Injectable({
  providedIn: 'root'
})
export class GroupsService implements OnInit{

  constructor(private httpClient : HttpClient, 
    private apiUrls : UrlsService) { 
  }
  async ngOnInit() {
    this.groups = await this.getAllGroupsForPerson();
  }

  public async getAllGroupsForPerson() {
    let g = await this.httpClient.get<IGroups[]>( this.apiUrls.GetApiURL()+"Api/Groups").toPromise();
    if(g == undefined)
      g = [];

    this.groups = g;
    return g;
  }

  public getGroups(){
    return this.groups;
  }

  groups !: IGroups[]; 
}

export interface IGroups
{
    Id : number;

    PersonID : number;
    
    Name : string;
}