import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  constructor() { }

  // Get api url with the / appended.
  public GetApiURL(){
    return "https://api.codefusionstudios.co.uk/"
  }
}
