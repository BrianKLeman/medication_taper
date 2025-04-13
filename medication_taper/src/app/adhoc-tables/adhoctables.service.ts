import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCredentialsService } from '../user-credentials.service';
import { UrlsService } from 'src/urls.service';

@Injectable({
  providedIn: 'root'
})
export class AdhocTablesService {
  constructor(private httpClient : HttpClient, 
    private user : UserCredentialsService,
    private apiUrls : UrlsService) { 
  }

  public async getAllAdhocTablesForPerson(){
    let x = await this.httpClient.get<IAdhocTable[]>( this.apiUrls.GetApiURL()+"Api/AdhocTables").toPromise();
    if(x)
    for(let b of x){
      console.log(JSON.stringify(b));
    }
    return x;
  }

  public async createTable(projectID : number, tableName : string){
    let x = await this.httpClient.post( this.apiUrls.GetApiURL()+`Api/AdhocTables/`, <IAdhocTable>{ Id : 0, ProjectID: projectID, Name: tableName, PersonID: 0 }).toPromise();
    if(x)
      console.log(JSON.stringify(x));
    
    return x;
  }

  public async deleteTable(tableID : number){
    let x = await this.httpClient.delete( this.apiUrls.GetApiURL()+`Api/AdhocTables/${tableID}`).toPromise();
    if(x)
      console.log(JSON.stringify(x));
    return x;
  }

  public async getSectionsForBeatchart(adhocTableId : number){
    let x = await this.httpClient.get<IAdhocTableColumn[]>( this.apiUrls.GetApiURL()+`Api/AdhocTables/${adhocTableId}/columns`).toPromise();
    if(x)
    for(let b of x){
      console.log(JSON.stringify(b));
    }
    return x;
  }

  public async getDetailsForBeatchart(adhocTableId : number){
    let x = await this.httpClient.get<IAdhocTableDetail[]>( this.apiUrls.GetApiURL()+`Api/AdhocTables/${adhocTableId}/details`).toPromise();
    if(x)
    for(let b of x){
      console.log(JSON.stringify(b));
    }
    return x;
  }

  public async getRowsForAdhocTable(adhocTableId : number){
    let x = await this.httpClient.get<IAdhocTableRow[]>( this.apiUrls.GetApiURL()+`Api/AdhocTables/${adhocTableId}/rows`).toPromise();
    if(x)
    for(let b of x){
      console.log(JSON.stringify(b));
    }
    return x;
  }

  public async createRow(adhocTableId : number, row : IAdhocTableRow){
    let x = await this.httpClient.post<IAdhocTableRowResponse>( this.apiUrls.GetApiURL()+`Api/AdhocTables/${adhocTableId}/rows`, row).toPromise();
    if(x)
      console.log(JSON.stringify(x));
    
    return x;
  }

  public async updateRow(adhocTableId : number, row : IAdhocTableRow){
    let x = await this.httpClient.put<IAdhocTableRow>( this.apiUrls.GetApiURL()+`Api/AdhocTables/${adhocTableId}/rows`, row).toPromise();
    if(x)
      console.log(JSON.stringify(x));
    return x;
  }

  public async deleteRow(beatchartId : number, scene : number){
    let x = await this.httpClient.delete( this.apiUrls.GetApiURL()+`Api/AdhocTables/${beatchartId}/rows/${scene}`).toPromise();
    if(x)
      console.log(JSON.stringify(x));
    return x;
  }

  public async deleteColumn(beatchartId : number, sectionID : number){
    let x = await this.httpClient.delete( this.apiUrls.GetApiURL()+`Api/AdhocTables/${beatchartId}/columns/${sectionID}`).toPromise();
    if(x)
      console.log(JSON.stringify(x));
    return x;
  }

  public async CreateDetail(adhocTableId : number, detail : IAdhocTableDetail){
    let x = await this.httpClient.post<IAdhocTableDetailResponse>( this.apiUrls.GetApiURL()+`Api/AdhocTables/${adhocTableId}/details`, detail).toPromise();
    if(x)
      console.log(JSON.stringify(x));
    return x;
  }

  public async UpdateDetail(adhocTableId : number, detail : IAdhocTableDetail){
    let x = await this.httpClient.put( this.apiUrls.GetApiURL()+`Api/AdhocTables/${adhocTableId}/details`, detail).toPromise();
    if(x)
      console.log(JSON.stringify(x));
    return x;
  }

  public async CreateColumn(adhocTableId : number, name : string){
    let x = await this.httpClient.post( this.apiUrls.GetApiURL()+`Api/AdhocTables/${adhocTableId}/columns/${name}`, {n : name}).toPromise();
    if(x)
      console.log(JSON.stringify(x));
    return x;
  }
}

export interface IAdhocTable{
  Id: number;
  Name: string;
  ProjectID: number;
}

export interface IAdhocTableColumn{
  Id : number;
  Name : string;
  AdhocTableID : number;
  Order : number;
}

export interface IAdhocTableRow{
  Id : number;
  Name : string;
  AdhocTableID : number;
}

export interface IAdhocTableDetail{
  Id : number;
  Details : string;
  AdhocTableID : number;
  AdhocTableRowID : number;
  AdhocTableColumnID : number;
}

export interface IAdhocTableRowResponse{  
  AdhocTableRowID : number;
}

export interface IAdhocTableDetailResponse{  
  AdhocTableDetailID : number;
}

export interface IAdhocTableColumnResponse{  
  AdhocTableColumnId : number;
}