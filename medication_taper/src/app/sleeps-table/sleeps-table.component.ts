import { Component, ElementRef, ViewChild } from '@angular/core';
import { TimezonesService } from '../timezones.service';
import { ISleepDay, ISleeps, SleepsService } from './sleeps.service';
import * as d3 from 'd3';
import { MatDialog } from '@angular/material/dialog';
import { SleepsFormComponent } from '../sleeps-form/sleeps-form.component';

@Component({
  selector: 'sleeps-table',
  templateUrl: './sleeps-table.component.html',
  styleUrls: ['./../app.component.css']
})
export class SleepsTableComponent {

  constructor(private sleepsService : SleepsService,
    private timeService : TimezonesService,
    private dialog : MatDialog
  ){
  }
  async ngOnInit(): Promise<void> {
    await this.refresh();
  }

  public adjustForTimezone(date : string | Date | null){
    if(date)
      if(typeof(date) === typeof(" "))
        return this.timeService.adjustForTimezoneStr(date as string);
      else
        return this.timeService.adjustForTimezone(date as Date);

    return "";
  }

  public async refresh(){
      let x = await this.sleepsService.getAllForPerson();

      this.sleeps = x ?? [];
      this.sleeps = this.sleeps.sort( (a, b) => { return new Date(a.FromDate as string).getTime() - new Date(b.FromDate as string).getTime();})
      console.log("Refreshed Sleeps "+ x?.length);
      this.createSleepChart(this.sleeps)
      return x?.length ?? 0;
  }

  sleeps !: ISleeps[];

  @ViewChild('container')
  public chartContainer !: ElementRef;

  public createSleepChart(sleeps : ISleeps[]){
     let data = this.sleepsService.hoursInLast7Days(sleeps).sort( 
      (a : ISleepDay, b : ISleepDay) =>
      {
        return a.ToDate.valueOf() - b.ToDate.valueOf()
      }
    
    );
    if(!data)
      return;
      // Declare the chart dimensions and margins.
      const width = 1200;
      const height = 500;
      const marginTop = 30;
      const marginRight = 40;
      const marginBottom = 40;
      const marginLeft = 40;
    
      // Declare the x (horizontal position) scale.
      const x = d3.scaleBand()
          .range([0, width ])
          .domain(data.map( (x : ISleepDay) => this.FormatDate(x.ToDate.toISOString())))
          .padding(.1);
          
      
          let max = d3.max( data, (d : ISleepDay) => { if(d.SumHours) return d.SumHours; return 0; }) as number;
          
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
    
      // Add a rect for each bar.
      svg.append("g")
          .attr("fill", "rgb(125, 125, 125)")
        .selectAll()
        .data(data)
        .join("rect")
          .attr("x", (d : ISleepDay) : number => { let v = x(this.FormatDate(d.ToDate.toISOString())); if(v) return v; else return 0;})
          .attr("y", (d) => y(d.SumHours ?? 0))
          .attr("height", (d) => y(0) - y(d.SumHours ?? 0))
          .attr("width", x.bandwidth());
    
      // Add the x-axis and label.
      svg.append("g")
          .attr("transform", `translate(0,${height - marginBottom})`)
          .call(d3.axisBottom(x).tickSizeOuter(0));
    
      // Add the y-axis and label, and remove the domain line.
      svg.append("g")
          .attr("transform", `translate(${marginLeft},0)`)
          .call(d3.axisLeft(y).tickFormat((y) => { let v = y as number; return (v).toFixed();}))
          .call(g => g.select(".domain").remove())
          .call(g => g.append("text")
              .attr("x", 0)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(" Hours "));
    
      // Return the SVG element.
      this.chartContainer.nativeElement.appendChild(svg.node() as Node);
    
  }

  private FormatDate(d : string){
    return d.split("T")[0].substring(8);
  }

  public async addSleep(){
    let d = new Date(Date.now());
    let x = await this.dialog.open(SleepsFormComponent, { data: 
        {
          datetime: Date,
          sleep : null
        }
      }).afterClosed().toPromise();
  }

  public async editSleep(s : ISleeps){
    let d = new Date(Date.now());
    let x = await this.dialog.open(SleepsFormComponent, { data: 
        {
          datetime: d,
          sleep : s
        }
      }).afterClosed().toPromise();
  }

  public async deleteSleep(s : ISleeps){
    await this.sleepsService.DeleteSleep(s);
  }
}
