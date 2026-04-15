import { Component, Input } from '@angular/core';
import { RoadmapService } from './roadmap-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { IRoadMap } from '../backlog/roadmap.service';

@Component({
  selector: 'app-roadmap-edit',
  templateUrl: './roadmap-edit.component.html',
  styleUrls: ['./roadmap-edit.component.css']
})
export class RoadmapEditComponent {
constructor(private roadmapsService : RoadmapService){

  }
  roadmapForm = new FormGroup({
  name : new FormControl(''),
  details : new FormControl(''),
  createdDate : new FormControl(new Date())
  });
  
  roadmapID : number = 0;
  public async onSubmit(){
    let v = this.roadmapForm.value;
    this.roadmap.Id = this.roadmapID;
    this.roadmap.Name = v.name ?? "";
    this.roadmap.Details = v.details ?? "";
    this.roadmap.CreatedDate = new Date(Date.now());
    let result : number | undefined = -1;
    if(this.roadmap.Id < 1)
      result = await this.roadmapsService.CreateRoadmap(this.roadmap);
    else
      result = await this.roadmapsService.UpdateRoadmap(this.roadmap);
    console.warn(`Update Roadmap returned ${result}`);
  }
  
  public Init(roadmap : IRoadMap | null, projectID : number){
    this.roadmap = roadmap ?? this.newRoadmap(projectID);
    this.roadmapID = this.roadmap.Id;
    this.SyncForm();
  }
  private roadmap !: IRoadMap;

  private newRoadmap(projectID : number){
    return <IRoadMap>{
       Name : "Untitled",
       Details : "",
       Id : 0,
       PersonId : 0,
       CreatedDate : null,
       ProjectID : projectID,
       LearningAimID : null
      }
  }
  
  private SyncForm(){
    this.roadmapForm.setValue( 
      { 
        name: this.roadmap.Name, 
        details: this.roadmap.Details,
        createdDate: new Date(this.roadmap.CreatedDate ?? Date.now())        
      });
  }

  @Input()
  inDialog = true;
}
