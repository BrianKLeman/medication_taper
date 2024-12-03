import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlsService } from 'src/urls.service';

@Injectable({
  providedIn: 'root'
})
export class AlcoholServiceService {

  constructor(private httpClient : HttpClient,
              private urlsService : UrlsService
  ) { }

  public async get(){
    let x = await this.httpClient.get<{ value : IAlcohol[]}>( this.urlsService.GetApiURL()+"odata/Alcohol").toPromise();

    if(x){
      for(let a of x.value)
        a.ShowNotes = false;
      return x.value;    
    }
    return [];
  }
}

export interface IAlcohol{
  Id: number;
  PersonID: number,
  Details: string,
  CreatedDate: string,
  CreatedUser: string,
  ConsumedDate: string,
  Personal: number,
  ShowNotes : boolean
}