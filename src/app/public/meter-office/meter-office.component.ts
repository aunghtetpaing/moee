import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-meter-office',
  templateUrl: './meter-office.component.html',
  styleUrls: ['./meter-office.component.css']
})
export class MeterOfficeComponent implements OnInit {

  panelOpenState: boolean;
  data = 1;
  snackBarOption: any = { duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom' };
  displayedColumns: any = ['id', 'name', 'state', 'region', 'address', 'phone', 'other', 'created_date', 'updated_date', 'active', 'option'];
  actionMessage: any = {};
  tableData: MatTableDataSource<any>;
  dialogComfirm: any = {};

  constructor(
    private dbService: NgxIndexedDBService
  ) { }

  private getTable() {
    this.dbService.getAll('meterOffice').then((table: any) => {
      console.log(table);
    });
  }

  ngOnInit() {
    this.getTable();
  }

}
