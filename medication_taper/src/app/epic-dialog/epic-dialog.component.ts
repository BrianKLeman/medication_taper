import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EpicEditComponent } from '../epic-edit/epic-edit.component';
import { IFeature } from '../features.service';

@Component({
  selector: 'app-epic-dialog',
  templateUrl: './epic-dialog.component.html',
  styleUrls: ['./epic-dialog.component.css'],
    standalone: false
})
export class EpicDialogComponent implements AfterViewInit {
  
  public constructor(@Inject(MAT_DIALOG_DATA) 
    private data: EpicData
  ){   }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
    if(!this.epicEdit)
      console.error("Epic Edit is null");
    else if(!this.epicEdit.Init)
      console.error(' TODO this.epicEdit.Init is not true')
    else if(!!this.epicEdit && this.epicEdit.Init){// TODO I get an error in unit tests saying Init is not a function. Checking Init is truthy avoids error
      console.log("Epic is populated");
      this.epicEdit.Init(this.data.epic, this.data.projectId, this.data.epic?.RoadMapID ?? 0);
    }
  }

 @ViewChild('epicEdit')
 epicEdit!: EpicEditComponent;
}

interface EpicData{
      datetime: Date,
      epic : IFeature | null,
      projectId : number
}
