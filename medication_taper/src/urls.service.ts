import { Injectable } from '@angular/core';
import { environment } from './environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  constructor() { }

  // Get api url with the / appended.
  public GetApiURL(){
    
    return environment.apiUrl;

  }
}
