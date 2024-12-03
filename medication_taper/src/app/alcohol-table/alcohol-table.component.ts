import { Component, OnInit } from '@angular/core';
import { AlcoholServiceService as AlcoholService, IAlcohol } from './alcohol-service.service';

@Component({
  selector: 'app-alcohol-table',
  templateUrl: './alcohol-table.component.html',
  styleUrls: ['./../app.component.css']
})
export class AlcoholTableComponent implements OnInit{
  constructor(
    private alcoholService : AlcoholService)  {

  }

  async ngOnInit(){
     this.alcohol = await this.alcoholService.get();
  }
  public alcohol : IAlcohol[] = [];

  async showNotes(alcohol : IAlcohol){
    alcohol.ShowNotes = !alcohol.ShowNotes;    
  }
}
