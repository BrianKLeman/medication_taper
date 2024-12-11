import { Pipe, PipeTransform } from '@angular/core';
import { GroupsService, IGroups } from './groups.service';

@Pipe({
  name: 'group'
})
export class GroupPipe implements PipeTransform {

  private groups !: IGroups[];
  constructor(private groupsService : GroupsService){

  }

  
  transform(value: unknown, ...args: unknown[]) {
    let id = value as number;
    let group = this.groupsService.getGroups().find( x => { return x.Id == id});
    return group?.Name;
  }

}
