import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FeaturesService, IFeature } from '../features.service';

@Component({
    selector: 'app-epic-edit',
    templateUrl: './epic-edit.component.html',
    styleUrls: ['./epic-edit.component.css'],
    standalone: false
})
export class EpicEditComponent {
  constructor(private featuresService : FeaturesService){   }
  
  epicForm = new FormGroup({
  name : new FormControl(''),
  details : new FormControl(''),
  createdDate : new FormControl(new Date())
  });
  
  featureID : number = 0;
  public async onSubmit(){
    let v = this.epicForm.value;
    this.feature.Id = this.featureID;
    this.feature.Name = v.name ?? "";
    this.feature.Details = v.details ?? "";
    if(!this.feature.LearningAimID)
      this.feature.LearningAimID = null;
    if(!this.feature.ProjectID)
      this.feature.ProjectID = null;
    this.feature.CreatedDate = new Date(Date.now());
    let result : number | undefined = -1;
    if(this.feature.Id < 1)
      result = await this.featuresService.CreateFeature(this.feature);
    else
      result = await this.featuresService.UpdateFeature(this.feature);
    console.warn(`Update Feature returned ${result}`);
  }
  
  public Init(feature : IFeature | null, projectID : number, roadmapID : number){
    this.feature = feature ?? this.featuresService.CreateDefault(projectID,roadmapID);
    this.feature.RoadMapID = roadmapID;   
    this.feature.ProjectID = projectID; 
    this.featureID = this.feature.Id;
    this.SyncForm();
  }
  private feature !: IFeature;
  
  private SyncForm(){
    this.epicForm.setValue( 
      { 
        name: this.feature.Name ?? "", 
        details: this.feature.Details ?? "",
        createdDate: new Date(this.feature.CreatedDate ?? Date.now())        
      });
  }

  @Input()
  inDialog = true;
}

