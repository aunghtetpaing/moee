import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSnackBar, MatBottomSheet } from '@angular/material';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-meter-office',
  templateUrl: './meter-office.component.html',
  styleUrls: ['./meter-office.component.css']
})
export class MeterOfficeComponent implements OnInit {

  meterOfficeForm: FormGroup;
  panelOpenState: boolean;
  snackBarOption: any = { duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom' };
  displayedColumns: any = ['id', 'name', 'state', 'region', 'address', 'phone', 'other', 'created_date', 'updated_date', 'active', 'option'];
  actionMessage: any = {};
  tableData: MatTableDataSource<any>;
  dialogComfirm: any = {};
  editMeterOfficeObject: any = {};

  @ViewChild('snackBarTemplate', {static: false }) snackBarTemplate: any = TemplateRef;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('openEditMeterOfficeTemplate', {static: false}) editMeterOfficeTemplate: any = TemplateRef;

  constructor(
    private dbService: NgxIndexedDBService,
    private snackBarCtrl: MatSnackBar,
    private sheetCtrl: MatBottomSheet,
    private fb: FormBuilder,
  ) { }

  get m () {
    return this.meterOfficeForm.controls;
  }

  private getTable() {
    this.dbService.getAll('meterOffice').then((table: any) => {
      this.tableData = new MatTableDataSource(table);
      this.tableData.paginator = this.paginator;
    })
  }

  private meterOfficeFormBuilder() {
    this.meterOfficeForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  openEditMeterOffice(element: any) {
    this.editMeterOfficeObject = element;
    this.m.name.setValue(element.name);
    this.m.address.setValue(element.address);
    this.m.phone.setValue(element.phone);
    this.m.description.setValue(element.description);

    this.dialogComfirm = this.sheetCtrl.open(this.editMeterOfficeTemplate);

  }

  editMeterOfficeInfo() {

    if(this.meterOfficeForm.invalid) {
      return;
    }

    this.editMeterOfficeObject.name = this.m.name.value;
    this.editMeterOfficeObject.phone = this.m.phone.value;
    this.editMeterOfficeObject.description = this.m.description.value;
    this.editMeterOfficeObject.address = this.m.address.value;

    this.dbService.update('meterOffice',this.editMeterOfficeObject).then(() => {
      this.actionMessage = 'ပြင်ဆင်မှုအောင်မြင်ပါသည်';
      this.snackBarCtrl.openFromTemplate(this.snackBarTemplate,this.snackBarOption);
      this.dialogComfirm.dismiss();
      this.getTable();
    });
  }

  ngOnInit() {
    this.getTable();
    this.meterOfficeFormBuilder();
  }

}
