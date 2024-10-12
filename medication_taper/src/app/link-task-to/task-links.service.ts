import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlsService } from 'src/urls.service';
import { LinksService } from './links.service';

@Injectable({
  providedIn: 'root'
})
export class TaskLinksService {

  constructor(
               private httpClient : HttpClient,
              private urlsService : UrlsService,
              private linksService : LinksService  ) { }

  public async getRecords(recordType : string){
    return await this.linksService.getRecords(recordType);   
  }

  public AddLink(taskIDs : number[], tableName : string, entityID : number){
    this.httpClient.post<number>( 
      this.urlsService.GetApiURL()+"Api/TaskLinks",
      { 
        TaskIDs : taskIDs,
        Table : tableName,
        EntityID : entityID
      }
    ).toPromise().then( (n) => { console.log(`written task links with id ${n}`); });
  }
}
