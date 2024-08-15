import { Component } from '@angular/core';
import { IPhenomena, PhenomenaService } from './phenomena.service';

@Component({
  selector: 'phenomena-table',
  templateUrl: './phenomena-table.component.html',
  styleUrls: ['./../app.component.css']
})
export class PhenomenaTableComponent {
  constructor(private phenomenaService : PhenomenaService
  ){
  }
  async ngOnInit(): Promise<void> {
    await this.refresh();
  }

  

  public async refresh(){
      let x = await this.phenomenaService.getAllPhenomenaForPerson();
      this.phenomena = x ?? [];
      console.log("Refreshed Phenomena "+ x?.length);
      return x?.length ?? 0;
  }

  phenomena : IPhenomena[] | null = null;
}

