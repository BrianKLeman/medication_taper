import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  constructor() { }

  // Get api url with the / appended.
  public GetApiURL(){
    //return "https://api.codefusionstudios.co.uk/";
    //return "http://localhost:56265/";
    return "https://localhost:7170/";
    //return "https://46.252.195.64/";

  }
}
