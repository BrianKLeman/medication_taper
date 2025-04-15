import { Component, Input, OnInit } from '@angular/core';
import { AdhocTablesService, IAdhocTable, IAdhocTableDetail, IAdhocTableRow, IAdhocTableColumn, IAdhocTableColumnResponse } from './adhoctables.service';

@Component({
  selector: 'app-adhoc-tables',
  templateUrl: './adhoctables.component.html',
  styleUrls: ['./../app.component.css']
})
export class AdhocTablesComponent implements OnInit{
public constructor(
    private service : AdhocTablesService){
  }

  async ngOnInit(){
    await this.refresh();
  }

  async refresh(){
    this.columns = await this.service.getSectionsForBeatchart(this.adhocTable.Id) ?? [];
    this.columns = this.columns.sort( (a,b) => a.Order - b.Order);
    this.rows = await this.service.getRowsForAdhocTable(this.adhocTable.Id) ?? [];
    this.details = await this.service.getDetailsForBeatchart(this.adhocTable.Id) ?? [];
  }

  public getDetail(sceneID : number, sectionID : number){
    let d = this.details.filter(  x => { return x.AdhocTableRowID == sceneID && x.AdhocTableColumnID == sectionID;});
    if(d[0])
      return d[0].Details;

    return "";
  }
  public getDetailData(rowID : number, columnID : number){
    let d = this.details.filter(  x => { return x.AdhocTableRowID == rowID && x.AdhocTableColumnID == columnID;});
    if(d.length == 0){
      let details = <IAdhocTableDetail>{ Id : 0, AdhocTableRowID : rowID, AdhocTableColumnID : columnID, Details: "", AdhocTableID: this.adhocTable.Id};
      
      
      this.details.push(details);
      return details;
    } else {
      return d[0];
    }
  }

  public async addNewRow(){
    let draftRow = this.rows.filter( x => x.Id == 0);
    if(draftRow.length == 0){
      let row = <IAdhocTableRow>{ Id: 0, AdhocTableID: this.adhocTable.Id, Name: "New*"};
      let response = await this.service.createRow(this.adhocTable.Id, row);
      row.Id = response?.AdhocTableRowID ?? 0;
      if(row.Id > 0)
        this.rows.push(row);
    }
  }

  public async SaveDetails(rowID : number, adhocTableId : number){
    let details = this.details.filter( x => x.AdhocTableRowID == rowID && x.AdhocTableID == adhocTableId);
    for(let d of details){
      if(d.Id == 0){
        let response = await this.service.CreateDetail(this.adhocTable.Id, d);
        d.Id = response?.AdhocTableDetailID ?? 0;
      } else {
        let response = await this.service.UpdateDetail(this.adhocTable.Id, d);
      }
    }

    // Save the scene aswell. I havn't done a state of if something is changed/modified.
    let s = this.rows.find( x => x.Id == rowID);
    if(s)
      await this.service.updateRow(this.adhocTable.Id, s);
    else
      console.log("Scene was not found.");
  }

  public async deleteRow(rowID : number){
    await this.service.deleteRow(this.adhocTable.Id, rowID);
    let sceneIndex = this.rows.findIndex( x => x.Id == rowID);
  
    this.rows.splice(sceneIndex,1);
    let details = this.details.filter( x => x.AdhocTableRowID == rowID && x.AdhocTableID == this.adhocTable.Id);
    for(let d of details){
      let detailIndex = this.details.findIndex( x => x.Id == d.Id);
      this.details.splice(detailIndex, 1);
    }
  }

  
  @Input()
  public adhocTable !: IAdhocTable;
  public columns : IAdhocTableColumn[] = [];
  public rows : IAdhocTableRow[] = [];
  public details : IAdhocTableDetail[] = [];

  public columnName : string = "";

  public async addColumn(){
    if(this.columnName.trim().length > 0){
      let x = <IAdhocTableColumnResponse>await this.service.CreateColumn(this.adhocTable.Id, this.columnName);
      this.columns.push( <IAdhocTableColumn>{ Id: x.AdhocTableColumnID, Name: this.columnName, Order : 0})
    }
  }

  public async deleteColumn(rowId : number){
      let x = await this.service.deleteColumn(this.adhocTable.Id, rowId);
      let sectionIndex = this.columns.findIndex(x => x.Id == rowId);
      this.columns.splice( sectionIndex, 0);
  }
}
