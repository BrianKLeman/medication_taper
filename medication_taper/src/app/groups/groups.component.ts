import { Component, EventEmitter, Output } from '@angular/core';
import { GroupsService, IGroups } from '../groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent {
    constructor(private groupsService : GroupsService){}

    async ngOnInit(){
      this.groups = await this.groupsService.getAllGroupsForPerson();
      this.groupViewModels = [];
      for( let g of this.groups)
        this.groupViewModels.push({ group : g, isSelected : false});
    }

    groups !: IGroups[];
    groupViewModels !: IGroupsSelectionVM[];

    public checkUncheckGroup( groupVM : IGroupsSelectionVM, check : any){
      groupVM.isSelected = check.target.checked;
      this.groupsChanged.emit(this.groupViewModels);
    }

    @Output()
    public groupsChanged = new  EventEmitter<IGroupsSelectionVM[]>;

}

export interface IGroupsSelectionVM
{
  group : IGroups;
  isSelected : boolean;

}