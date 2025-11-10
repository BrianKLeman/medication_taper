import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from 'src/urls.service';
import { LinksService } from '../link-task-to/links.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteLinksService {

  constructor(private readonly httpClient : HttpClient,
              private readonly urlsService : UrlsService,
              private readonly linksService : LinksService  ) { }

  public async getRecords(recordType : string){
    return await this.linksService.getRecords(recordType);   
  }

  public async AddLink(noteIDs : number[], tableName : string, entityID : number){
    try
    {      
      const requestBody =  { 
          NoteIDs : noteIDs,
          Table : tableName,
          EntityID : entityID
        }
      const result = await firstValueFrom(this.httpClient.post<number>( `${this.urlsService.GetApiURL()}Api/NoteLinks`, requestBody ));
      console.log(`written note links with id ${result}`);
    } 
    catch ( error){
      console.error("Error adding note link ", error);
      throw error;
    }

  }
}
