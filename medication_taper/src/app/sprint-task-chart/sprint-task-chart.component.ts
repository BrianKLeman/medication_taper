import { Component, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { COMPLETED, ITasksGroupsViewModel } from '../kanban-board/tasks.service';
import { ISprint } from '../sprints.service';
import { TimezonesService } from '../timezones.service';
import { ISubTask } from '../sub-tasks-edit/sub-tasks.service';

@Component({
  selector: 'app-sprint-task-chart',
  templateUrl: './sprint-task-chart.component.html',
  styleUrls: ['./sprint-task-chart.component.css']
})
export class SprintTaskChartComponent {

  constructor(
      private timeService : TimezonesService
    ){}
    //#region Draw Chart
   @ViewChild('container')
    public chartContainer !: ElementRef;
  
    public createBurndownChart(tasks : ITasksGroupsViewModel[], sprint : ISprint){
       let data = this.createTasksRemainingOnEachDay(tasks, sprint);
      
        if(!data)
          return;
        // Declare the chart dimensions and margins.
        const width = 1200;
        const height = 500;
        const marginTop = 30;
        const marginRight = 40;
        const marginBottom = 40;
        const marginLeft = 40;
      
        let accessor = (d : IBurndownEntry) : Date => 
          { 
            if(d.day == undefined) return new Date(); else return d.day;
          };
        let dom = d3.extent(data, accessor);
        // Declare the x (horizontal position) scale.
        const x = d3.scaleUtc()
        .domain( [data[0].day, data[data.length-1].day])
        .range([marginLeft,width-marginRight]);
        //let dayTick = x.tickFormat(data.length, '%a %d');
       
            
        let max = d3.max( data, (d : IBurndownEntry) => { if(d.tasksTargetRemainingCount) return d.tasksTargetRemainingCount; return 0; }) as number;
            
        // Declare the y (vertical position) scale.
        const y = d3.scaleLinear()
            .domain([0, max]) 
            .range([height - marginBottom, marginTop]);
      
        // Create the SVG container.
        const svg = d3.create("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto;");
      
       
         // Create line generator
         let validData = [];
         for(let d of data)
            if(d.day.valueOf() <= Date.now())
              validData.push(d);
        const line = d3.line<IBurndownEntry>()
            .x(d => x(d.day))
            .y(d => y(d.tasksRemainingCount))
            ;
  
        const targetLine = d3.line<IBurndownEntry>()
            .x(d => x(d.day))
            .y(d => y(d.tasksTargetRemainingCount));
        // Append a path for the line.
        svg.append("path")
        .attr("fill", "none")
        .attr("stroke", "orange")
        .attr("stroke-width", 3)
        .attr("d", line(validData));
  
        svg.append("path")
        .attr("fill", "none")
        .attr("stroke", "grey")
        .attr("stroke-width", 3)
        .attr("d", targetLine(data));
  
        // Add the x-axis and label.
        svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(d3.axisBottom(x))
            .call(g => g.append("text").attr("transform", `translate(0,0)`)
          .attr("x", width/2)
          .attr("y", 30 )
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("Day"));
      
        // Add the y-axis and label, and remove the domain line.
        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y).tickFormat((y) => { let v = y as number; return (v).toFixed();}))
            //.call(g => g.select(".domain").remove())
            .call(g => g.append("text")
                .attr("x", 0)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text(" Tasks "));
  
        
      
        // Return the SVG element.
        this.chartContainer.nativeElement.innerHTML = "";
        this.chartContainer.nativeElement.appendChild(svg.node() as Node);
      
    }
    
    private createTasksRemainingOnEachDay( tasks : ITasksGroupsViewModel[], board : ISprint) : IBurndownEntry[]{
      const countTasks = tasks.flatMap( X => X.SubTasks).map( (t : ISubTask) => 1).reduce( (prev : number, total : number ) => prev + total,0);
      const countExpectedHours = tasks.flatMap( X => X.SubTasks).map((t : ISubTask) => t.ExpectedHours ?? 0).reduce((p, c) => p + c,0);
  
      // Create a burndown Entry for every day of the sprint
      const startDate = new Date(board.StartDate.split("T")[0]);
      
      const dayBefore = this.timeService.subtractDaysFromDateTime(1, startDate);
      const endDate = new Date(board.EndDate.split("T")[0]);
      const plannedDayCount = this.timeService.dateDifferenceInDays(startDate, endDate);
      
      // Calculate non working days
      const nonWorkingDays = this.timeService.findNonWorkingDays(startDate, endDate);
      const adjustedPlannedDayCount = plannedDayCount - nonWorkingDays.length + 1;

      let lastCompletedDay = new Date(0);
      for(let d of tasks.flatMap(x => x.SubTasks).map( x => x.DateCompleted ))
        if( d )
          {
            let date = new Date(d);
            if( date > lastCompletedDay)
              lastCompletedDay = date;
          }   
      const lDate = new Date(board.EndDate);
      if( lastCompletedDay.valueOf() < lDate.valueOf())
        lastCompletedDay = lDate;
      const dayCount = this.timeService.dateDifferenceInDays(startDate, lastCompletedDay);
      let entries : IBurndownEntry[] = [];
      let expectedAmount = countTasks;
      let previousAmount = expectedAmount;
      for(let i = 0; i <= dayCount; ++i){
        const day = this.timeService.addDaysToDateTime(i, startDate);
        // Handle daylight savings adjustment        
        const endOfDay = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59,59);
        
        let allCompletedByDay = tasks.flatMap(t => t.SubTasks).map( (t : ISubTask) : number=>  {
          if(t.DateCompleted == null)
            return 0;
          if(new Date(t.DateCompleted).valueOf() < endOfDay.valueOf())
            return 1;
          return 0;
        }).reduce((p : number, c : number) => p + c,0);
        let sameDays = nonWorkingDays.filter( x => this.timeService.isSameday(x,endOfDay));
        const isNonWorkingDay = sameDays.length > 0;

        previousAmount = expectedAmount;
        if(isNonWorkingDay == false)
          expectedAmount -= countTasks/(adjustedPlannedDayCount);
        
        expectedAmount = Math.max(0, expectedAmount);
        let entry : IBurndownEntry = <IBurndownEntry>{ 
          day : day, 
          pointsRemaining : countExpectedHours, 
          tasksRemainingCount : countTasks - allCompletedByDay,
          tasksTargetRemainingCount : (isNonWorkingDay ? previousAmount : expectedAmount)
        };
          

        entries.push(entry);
      }

      let firstEntry : IBurndownEntry = <IBurndownEntry>{ 
        day: dayBefore, 
        pointsRemaining: countExpectedHours,
       tasksRemainingCount : countTasks,
       tasksTargetRemainingCount : countTasks};
      return [firstEntry, ...entries]
      
    }
  
  
     private FormatDate(d : string){
      return d.split("T")[0].substring(8);
    }
  
    //#endregion
}

interface IBurndownEntry{
  day : Date;
  pointsRemaining : number;
  tasksRemainingCount : number;
  tasksTargetRemainingCount : number;
}