import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { MatSnackBar, MatPaginator, MatTableDataSource, MatBottomSheet } from '@angular/material';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit {

  stateForm: FormGroup;
  meterOfficeForm: FormGroup;
  panelOpenState: boolean;

  snackBarOption: any = { duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom' };
  submitted: any = {};
  actionMessage: any = {};
  stateObject: any = {};
  editObject: any = {};
  addMeterObject: any = {};
  exportObject: any = {};
  displayedColumns: any = ['id', 'name', 'regional_id','created_date', 'updated_date', 'active', 'option'];
  dataSource: MatTableDataSource<any>;
  dialogComfirm: any = {};

  @ViewChild('snackBarTemplate', { static: false })
  snackBarTemplate: any =TemplateRef;

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  @ViewChild('addMeterOfficeTemplate', { static: false })
  addMeterOfficeTemplate: any = TemplateRef;

  @ViewChild('editStateTemplate', { static: false })
  editStateTemplate: any = TemplateRef;

  constructor(
    private snackBarCtrl: MatSnackBar,
    private sheetCtrl: MatBottomSheet,
    private fb: FormBuilder,
    private dbService: NgxIndexedDBService,
  ) { }

  get s() {
    return this.stateForm.controls;
  }

  get m() {
    return this.meterOfficeForm.controls;
  }

  private stateFormBuilder() {
    this.stateForm  = this.fb.group({
      name: ['',[Validators.required]]
    });
  }

  private meterOfficeFormBuilder() {
    this.meterOfficeForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  } 

  private getAll() {
    this.dbService.getAll('state').then((result: any) => {
      this.exportObject = result;
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
    });
  }

  statusChange(acitiveStatus: any) {
    let statusChangeObject: any = {};

    if(acitiveStatus.active === 1) {
      statusChangeObject.active = 0;
  }

    if(acitiveStatus.active === 0) {
      statusChangeObject.active = 1;
    }

    statusChangeObject.id = acitiveStatus.id;
    statusChangeObject.name = acitiveStatus.name;
    statusChangeObject.created_date = acitiveStatus.created_date;
    statusChangeObject.updated_date = new Date();

    this.dbService.update('state',statusChangeObject).then(() => {
      this.actionMessage = 'လုပ်ဆောင်မှုအောင်မြင်ပါသည်';
      this.snackBarCtrl.openFromTemplate(this.snackBarTemplate, this.snackBarOption);
      this.getAll();
    });
    
  }

  openEditStateForm(element:any) {
    this.editObject = element;
    this.dialogComfirm = this.sheetCtrl.open(this.editStateTemplate);
  }

  addMeterOffice() {
    
    if(this.meterOfficeForm.invalid) {
      return;
    }

    const saveObject = {
      name: this.m.name.value,
      regional_id: this.addMeterObject.regional_id,
      state_id: this.addMeterObject.id,
      address: this.m.address.value,
      phone: this.m.phone.value,
      description: this.m.description.value,
      created_date: new Date(),
      update_date: new Date(),
      active: 1
    }

    console.log(saveObject);

    this.dbService.add('meterOffice', saveObject).then(() => {
      this.actionMessage = "စာရင်းသွင်းမှုအောင်မြင်ပါသည်";
      this.snackBarCtrl.openFromTemplate(this.snackBarTemplate, this.snackBarOption);
    });

  }

  openAddMeterOffice(element: any) {
    this.addMeterObject = element;
    this.dialogComfirm = this.sheetCtrl.open(this.addMeterOfficeTemplate);
  }

  editState() {

    this.submitted = true;

    if(this.stateForm.invalid) {
      this.submitted = false;
      return;
    }
    
    this.editObject.name = this.s.name.value;
    this.editObject.updated_date = new Date();
    
    this.dbService.update('state',this.editObject).then(() => {
      this.getAll();
      this.actionMessage = 'ပြင်ဆင်မှုအောင်မြင်ပါသည်';
      this.snackBarCtrl.openFromTemplate(this.snackBarTemplate, this.snackBarOption);
      this.dialogComfirm.dismiss();
    });
  }

  exportAsExcelFile() {
    let exportExcel: any = [];
    let activeState: string;
    
    for(let i =0; i<this.exportObject.length; i++) {

      if(this.exportObject[i].active === 1) {
        activeState = 'အသုံးပြုရန်အသင့်ရှိသည်';
      }

      if(this.exportObject[i].active === 0) {
        activeState = 'အသုံးပြုခြင်းပိတ်ထားပါသည်';
      }

      const object = {
        '#': this.exportObject[i].id,
        'ပြည်နယ်/တိုင်း' : this.exportObject[i].name,
        '	စာရင်းပြုစုသည့်ရက်စွဲ': this.exportObject[i].created_date,
        'ပြင်ဆင်သည့်ရက်စွဲ' : this.exportObject[i].updated_date,
        'အခြေအနေ' : activeState
      }

      exportExcel.push(object);
    }

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportExcel);
    const workbook: XLSX.WorkBook = { Sheets: { 'ပြည်နယ်နှင့်တိုင်းဒေသကြီးများ': worksheet }, SheetNames: ['ပြည်နယ်နှင့်တိုင်းဒေသကြီးများ']};
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    this.saveAsExcelFile(excelBuffer,'ပြည်နယ်နှင့်တိုင်းဒေသကြီးများ');

  }

  ngOnInit() {
    this.panelOpenState = true;
    this.stateFormBuilder();
    this.meterOfficeFormBuilder();
    this.getAll();
  }

}
