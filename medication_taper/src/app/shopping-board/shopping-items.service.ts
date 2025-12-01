import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlsService } from 'src/urls.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingItemsService {

  constructor(private httpClient : HttpClient, private urlsService : UrlsService) { }

  public async getAllForPerson() : Promise<IShoppingItems[]>{
    let x = await this.httpClient.get<{ value : IShoppingItems[]}>( this.urlsService.GetApiURL()+"odata/ShoppingItems").toPromise();

    if(x)
      return x.value;    
    return [];
  }

  

  public async UpdateItem(item : IShoppingItems){
    let x = await this.httpClient.put<IShoppingItems>( this.urlsService.GetApiURL()+`odata/ShoppingItems/${item.Id}`,  item).toPromise();
    return x;
  }
}


export interface IShoppingItems {
  Id: number;
  ItemName: string;
  Status: string;
  PersonId: number;
  DateChecked: string | null;
  CreatedDate: string;
  CreatedBy: string;
  Personal : number;
}

export const ENOUGH = "ENOUGH";
export const NOT_ENOUGH = "NOT_ENOUGH";
export const BUYING = "BUYING";
export const IN_TROLLEY = "IN_TROLLEY"; 