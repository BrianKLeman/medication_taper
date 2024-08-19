import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCredentialsService } from '../user-credentials.service';
import { UrlsService } from 'src/urls.service';

@Injectable({
  providedIn: 'root'
})
export class JobsAtHomeService {
  constructor(private httpClient : HttpClient, 
    private user : UserCredentialsService,
    private apiUrls : UrlsService) { 
  }

  public async getJobsAtHomeSummaryForPerson(){
    let x = await this.httpClient.get<IJobDetails[]>( this.apiUrls.GetApiURL()+"Api/JobsAtHome/Summary").toPromise();
    
    return x;
  }

  public async logActivity(activity : LogActivity){
    let x = await this.httpClient.post<LogActivity>( this.apiUrls.GetApiURL()+"Api/JobsAtHome/Log", activity).toPromise();
    
    return x;
  }
}

export interface IJobDetails
{  
    JobID: number,
    Job: string,
    PersonID: number,
    DateCompleted: string
}

export class LogActivity
{
  public JobID : number = 0;
  public date : Date | null = null;
}