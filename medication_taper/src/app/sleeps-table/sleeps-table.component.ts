import { Component, ElementRef, ViewChild } from '@angular/core';
import { TimezonesService } from '../timezones.service';
import { ISleeps, SleepsService } from './sleeps.service';
import * as d3 from 'd3';

@Component({
  selector: 'sleeps-table',
  templateUrl: './sleeps-table.component.html',
  styleUrls: ['./../app.component.css']
})
export class SleepsTableComponent {

  constructor(private sleepsService : SleepsService,
    private timeService : TimezonesService,
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

  sleeps : ISleeps[] | null = null;

  @ViewChild('container')
  public chartContainer !: ElementRef;

  public createSleepChart(data : ISleeps[] | null){
     
    if(!data)
      return;
      // Declare the chart dimensions and margins.
      const width = 928;
      const height = 500;
      const marginTop = 30;
      const marginRight = 0;
      const marginBottom = 30;
      const marginLeft = 40;
    
      // Declare the x (horizontal position) scale.
      const x = d3.scaleBand()
          .range([marginLeft, width - marginRight])
          .padding(0.1);
      
          let max = d3.max( data, (d : ISleeps) => { if(d.Hours) return d.Hours; return 0; }) as number;
          
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
          .attr("fill", "steelblue")
        .selectAll()
        .data(data)
        .join("rect")
          .attr("x", '2024')
          .attr("y", (d) => y(d.Hours ?? 0))
          .attr("height", (d) => y(0) - y(d.Hours ?? 0))
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
              .text("↑ Frequency (%)"));
    
      // Return the SVG element.
      this.chartContainer.nativeElement.appendChild(svg.node() as Node);
    
  }
}
