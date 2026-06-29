import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IProject } from '../projects-table/projects.service';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { IRoadMap, RoadmapService } from './roadmap.service';
import { FeaturesService, IFeature } from '../features.service';
import {  ITasks, NOT_STARTED, TasksService } from '../kanban-board/tasks.service';
import { TaskEditComponent } from '../task-edit/task-edit.component';
import { SubTasksEditComponent } from '../sub-tasks-edit/sub-tasks-edit.component';
import { ISubTask } from '../sub-tasks-edit/sub-tasks.service';
import { RoadmapEditComponent } from '../roadmap-edit/roadmap-edit.component';
import { EpicEditComponent } from '../epic-edit/epic-edit.component';
import { MatMenuModule  } from '@angular/material/menu';


export enum ItemType { ROADMAP = 0, EPIC = 1, STORY =2, TASK = 3, PROJECT = 4};
/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface ProjectNode {
  id: number;
  name: string;
  itemType : ItemType;
  children: ProjectNode[];
  status: string;
  roadmap: IRoadMap | null;
  task: ITasks | null;
  feature: IFeature | null;
  subTask: ISubTask | null;
  project: IProject | null;
  parentID: number | null;
}

/** Flat node with expandable and level information */
interface ProjectFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  itemType : ItemType
  status: string;
  projectNode : ProjectNode;
}

@Component({
    selector: 'app-backlog',
    templateUrl: './backlog.component.html',
    styleUrls: ['./backlog.component.css'],
    standalone: false
})
export class BacklogComponent implements OnInit {
    @Input()
    public project !: IProject;

    private _transformer = (node: ProjectNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      itemType: node.itemType,
      status: node.status,
      projectNode : node
    };
  };

  treeControl = new FlatTreeControl<ProjectFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor( private roadmapService : RoadmapService, 
    private featuresService : FeaturesService,
  private tasksService : TasksService) {
    this.dataSource.data = [];
  }
  async ngOnInit() {
    this.dataSource.data = await this.getProjectDetails();
  }

  hasChild = (_: number, node: ProjectFlatNode) => node.expandable;

 async getProjectDetails() {

  let nodes : ProjectNode[] = [];
  let root : ProjectNode = <ProjectNode>{ 
    id : this.project.Id,
    name: this.project.Name,
    itemType: ItemType.PROJECT,
    children : [],
    status : "",
    roadmap : null,
    task: null,
    feature: null,
    subTask: null,
    project: this.project,
    parentID: 0};
  let roadMaps = await this.roadmapService.getRoadmapsForProject(this.project.Id);
  if(!!roadMaps && roadMaps.length > 0){

      root.children = roadMaps.map<ProjectNode>(
      (v : IRoadMap) : ProjectNode => 
        <ProjectNode>{
          id: v.Id,
          name: v.Name, 
          itemType : ItemType.ROADMAP, 
          children : [],
          status : "",
          roadmap : v,
          task : null,
          feature : null,
          subTask : null,
          project : null,
          parentID : this.project.Id
        });
    }

    let features : IFeature[]= [];
    let featuresResult = await this.featuresService.getAllFeaturesForProjectAndPerson(this.project.Id);
    if(featuresResult)
      features = featuresResult;
    if(!!features && features.length > 0){
      for(let n of root.children){
        let fForRoadmap = [];
        for(let f of features){
          if(f.RoadMapID == n.id){
            const feature = <ProjectNode>{ 
              id : f.Id, 
              name : f.Name, 
              itemType : ItemType.EPIC, 
              children : [], 
              status: "",
              roadmap: null,
              feature: f,
              task: null,
              subTask : null,
              project : null,
              parentID : f.RoadMapID
            };
            fForRoadmap.push(feature);
          } else if(!f.RoadMapID){

          }
        }
        n.children = fForRoadmap;
      }
    }

    let tasks = await this.tasksService.getAllWithExtrasForPersonTableRecord("PROJECTS", this.project.Id);
    if(!!tasks && tasks.length > 0){
      let unparentedNode = <ProjectNode>{ 
        id: -1, 
        name : "UnParented Tasks", 
        itemType : ItemType.ROADMAP, 
        children: [], 
        status: "",
        roadmap : null,
        task: null,
        feature: null,
        subTask: null,
        project: null,
        parentID: this.project.Id};
      for(let t of tasks){
        for(let f of t.Features){
          for(let n of root.children){
            if(n.itemType == ItemType.ROADMAP){
              for(let nr of n.children){
                if(nr.itemType == ItemType.EPIC){
                  if(f.Id == nr.id){
                    let story = <ProjectNode>{ 
                      id: t.Task.Id, 
                      name: t.Task.TaskName, 
                      children: [], 
                      itemType : ItemType.STORY, 
                      status : t.Task.Status,
                      roadmap : null,
                      feature : null,
                      task: t.Task,
                      subTask: null,
                      project: null,
                      parentID : f.Id
                    };
                    let subTasks = [];
                    for(let st of t.SubTasks)
                      subTasks.push( <ProjectNode>{
                        id: st.Id,
                        name: st.Name,
                        children: [],
                        itemType : ItemType.TASK,
                        status : st.Status,
                        roadmap : null,
                        feature : null,
                        task: null,
                        subTask: st,
                        project : null,
                        parentID : t.Task.Id
                    });
                    story.children = subTasks;
                      nr.children.push(story);
                  }
                }
              }
            }
          }
        }

        if(!t.Features || t.Features.length == 0){
          let unparentedStory = <ProjectNode>{ 
            id: t.Task.Id, 
            name: t.Task.TaskName, 
            children: [], 
            itemType : ItemType.STORY, 
            status: t.Task.Status,
            roadmap : null,
            feature : null,
            task : t.Task,
            subTask : null,
            project : null,
            parentID : - 1
          };

          // Need to add sub tasks here.
          let subTasks = [];
                    for(let st of t.SubTasks)
                      subTasks.push( <ProjectNode>{
                        id: st.Id,
                        name: st.Name,
                        children: [],
                        itemType : ItemType.TASK,
                        status : st.Status,
                        roadmap : null,
                        feature : null,
                        task: null,
                        subTask: st,
                        project : null,
                        parentID : t.Task.Id
                    });
                    unparentedStory.children = subTasks;
          unparentedNode.children.push(unparentedStory);
        }
      }
      if(unparentedNode.children.length > 0)
        root.children.push(unparentedNode);
    }
    return [root];  
 }

 //#region "Node Selection"
 public selectedNode : ProjectNode | null = null;

 public isSelectedNodeAnEpic(){
  return this.selectedNode?.itemType == ItemType.EPIC;
 }

 public isSelectedNodeAStory(){
  return this.selectedNode?.itemType == ItemType.STORY;
 }

 public isSelectedNodeARoadmap(){
  return this.selectedNode?.itemType == ItemType.ROADMAP;
 }

 public isSelectedNodeATask(){
  return this.selectedNode?.itemType == ItemType.TASK;
 }

 public isSelectedNodeAProject(){
  return this.selectedNode?.itemType == ItemType.PROJECT;
 }

 public isProject(node : ProjectNode){
    return node.itemType == ItemType.PROJECT;
 }

  public isEpic(node : ProjectNode){
    return node.itemType == ItemType.EPIC;
 }

  public isStory(node : ProjectNode){
    return node.itemType == ItemType.STORY;
 }

   public isTask(node : ProjectNode){
    return node.itemType == ItemType.TASK;
 }

  public isRoadmap(node : ProjectNode){
    return node.itemType == ItemType.ROADMAP;
 }
 public onSelect(node : ProjectNode){
    this.selectedNode = node;
    let me = this;
    setTimeout( () => 
      {
       me.init();
      },500)
    
 }

 public init(){
   if(!!this.taskEditForm && this.selectedNode?.itemType == ItemType.STORY)
      this.taskEditForm.Init({ datetime : new Date(this.selectedNode.task?.CreatedDate ?? Date.now()), task : this.selectedNode.task, entity : "PROJECTS", entity_id : this.project.Id, epic_id : this.selectedNode.parentID ?? 0 })
    else if(!!this.subTaskEditForm && this.selectedNode?.itemType == ItemType.TASK && this.selectedNode.subTask)
      this.subTaskEditForm.Init( this.selectedNode.subTask, this.selectedNode.parentID ?? 0);
    else if(!!this.roadmapEditForm && this.selectedNode?.itemType == ItemType.ROADMAP && this.selectedNode.roadmap)
      this.roadmapEditForm.Init( this.selectedNode.roadmap, this.project.Id);
    else if(!!this.epicEditForm && this.selectedNode?.itemType == ItemType.EPIC && this.selectedNode.feature)
      this.epicEditForm.Init( this.selectedNode.feature, this.project.Id, this.selectedNode.parentID ?? -1);
 }
 @ViewChild("taskEdit")
 taskEditForm !: TaskEditComponent;

 @ViewChild("subTaskEdit")
 subTaskEditForm !: SubTasksEditComponent;
 
 @ViewChild("roadmapEdit")
 roadmapEditForm !: RoadmapEditComponent;

 @ViewChild("epicEdit")
 epicEditForm !: EpicEditComponent;
 //#endregion

 //#region Commands
public appendNewRoadMap(node : ProjectFlatNode){
  node.projectNode.children.push(<ProjectNode>{
    id: 0,
    name: "Untitled",
    itemType : ItemType.ROADMAP,
    children: [],
    status: NOT_STARTED,
    roadmap: <IRoadMap>{ Id: 0, 
      Name : "Untitled", 
      PersonId: this.project.PersonID, 
      Details : "", 
      CreatedDate : new Date(Date.now()),
      ProjectID : this.project.Id },
    task: null,
    feature: null,
    subTask: null,
    project: null,
    parentID: node.projectNode.id
  })
  //force a refresh of the data // it says to do this on claude.ai
  this.dataSource.data = [...this.dataSource.data];
}

public appendNewTask(node : ProjectFlatNode){
  node.projectNode.children.push(<ProjectNode>{
    id: 0,
    name: "Untitled",
    itemType : ItemType.TASK,
    children: [],
    status: NOT_STARTED,
    roadmap: null,
    task: null,
    feature: null,
    subTask: <ISubTask>{ Id: 0, 
      Name : "Untitled", 
      PersonId: this.project.PersonID, 
      Details : "", 
      CreatedDate : new Date(Date.now()),
      DateCompleted : null,
      ProjectID : this.project.Id,
      TaskID : 0,
      Status : NOT_STARTED,
      MinHours : 1,
      MaxHours : 2,
      ExpectedHours : 1.5,
      ActualHours : 0 },
      project: null,
      parentID: node.projectNode.id
  })
  //force a refresh of the data // it says to do this on claude.ai
  this.dataSource.data = [...this.dataSource.data];
}

public appendNewStory(node : ProjectFlatNode){
  node.projectNode.children.push(<ProjectNode>{
    id: 0,
    name: "Untitled",
    itemType : ItemType.STORY,
    children: [],
    status: NOT_STARTED,
    roadmap: null,
    task: this.tasksService.DefaultTask(new Date(Date.now())),
    project: null,
    feature: null,
    subTask: null,
    parentID: node.projectNode.id})
  //force a refresh of the data // it says to do this on claude.ai
  this.dataSource.data = [...this.dataSource.data];
}

public appendNewEpic(node : ProjectFlatNode){
  node.projectNode.children.push(<ProjectNode>{
    id: 0,
    name: "Untitled",
    itemType : ItemType.EPIC,
    children: [],
    status: NOT_STARTED,
    roadmap: null,
    task: null,
    project: null,
    feature: this.featuresService.CreateDefault(this.project.Id, node.projectNode.roadmap!.Id),
    subTask: null,
    parentID: node.projectNode.id})
  //force a refresh of the data // it says to do this on claude.ai
  this.dataSource.data = [...this.dataSource.data];
}

appendNewNode(node : ProjectFlatNode){
  if(this.isEpic(node.projectNode))
    this.appendNewStory(node);
  if(this.isRoadmap(node.projectNode))
    this.appendNewEpic(node);
  if(this.isStory(node.projectNode))
    this.appendNewTask(node);
  if(this.isProject(node.projectNode))
    this.appendNewRoadMap(node);
}

isNodeSelected(node : ProjectFlatNode){
  return this.selectedNode?.id == node.projectNode.id;
}
 //#endregion
}


