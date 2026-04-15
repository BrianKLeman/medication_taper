import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoadmapEditComponent } from '../roadmap-edit/roadmap-edit.component';
import { IRoadMap } from '../backlog/roadmap.service';

@Component({
    selector: 'app-roadmap-dialog',
    templateUrl: './roadmap-dialog.component.html',
    styleUrls: ['./roadmap-dialog.component.css'],
    standalone: false
})
export class RoadmapDialogComponent implements AfterViewInit {
    public constructor(@Inject(MAT_DIALOG_DATA) 
    private data: RoadmapData
 ){
  }
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
    if(!this.roadmapEdit)
      console.error("Roadmap Edit is null");
    else
      console.log("RoadMap is populated");
    this.roadmapEdit.Init(this.data.roadmap, this.data.projectId);
  }
 @ViewChild('roadmapEdit')
 roadmapEdit!: RoadmapEditComponent;
}

interface RoadmapData{
      datetime: Date,
      roadmap : IRoadMap | null,
      projectId : number
}
