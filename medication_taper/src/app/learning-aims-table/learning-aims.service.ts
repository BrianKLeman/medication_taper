import { Injectable } from '@angular/core';
import { UserCredentialsService } from '../user-credentials.service';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from 'src/urls.service';

@Injectable({
  providedIn: 'root'
})
export class LearningAimsService {

  constructor(private httpClient : HttpClient, 
    private apiUrls : UrlsService) { 

  }

  public async getAllAimsForPerson(){
    let x = await this.httpClient.get<ILearningAim[]>( this.apiUrls.GetApiURL()+"Api/LearningAims").toPromise();
    if(x)
      for(let a of x){
        a.ShowNotes = false;
        a.ShowTasks = false;
      }
    return x;
  }
}

export interface ILearningAim{
  Id : number,
  CreatedDate: Date | string,
  Name: string,
  Description: string,
  PersonID: 1,
  AchievedDate: Date | string | null,
  ShowNotes: boolean,
  ShowTasks: boolean
}
