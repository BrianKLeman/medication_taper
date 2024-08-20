import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlsService } from 'src/urls.service';

@Injectable({
  providedIn: 'root'
})
export class PhenomenaService {

  constructor(private httpClient : HttpClient,
    private apiUrls : UrlsService) { 
  }

  public async getAllPhenomenaForPerson(){
    let x = await this.httpClient.get<IPhenomena[]>( this.apiUrls.GetApiURL()+"Api/Phenomena").toPromise();
    if(x)
      for(let p of x){
        p.ShowNotes = false;
      }
    return x;
  }
}

export interface IPhenomena{
  PhenomenaID : number,
  PhenomenaDetails: string
  ShowNotes : boolean
}