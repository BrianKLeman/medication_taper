import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCredentialsService } from '../user-credentials.service';
import { UrlsService } from 'src/urls.service';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionsService {
  
  constructor(private httpClient : HttpClient, 
    private user : UserCredentialsService,
    private apiUrls : UrlsService) { 
  }

  public async getAllPrescriptionsForPerson(){
    let x = await this.httpClient.get<IPrescription[]>( this.apiUrls.GetApiURL()+"Api/Prescriptions").toPromise();
    return x;
  }
}

export interface IPrescription{
  PrescriptionID : number,
  Name: string,
  DoseMG: number,
  Reason : string,
  MinHalfLifeHours : number,
  MaxHalfLifeHours : number,
  AverageHalfLifeHours : number,
  PersonID: 1,
  EndDate: Date
}
