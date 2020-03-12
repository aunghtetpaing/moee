import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { MatSnackBar, MatPaginator, MatTableDataSource, MatBottomSheet } from '@angular/material';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-regional',
  templateUrl: './regional.component.html',
  styleUrls: ['./regional.component.css']
})
export class RegionalComponent implements OnInit {

  regionalForm: FormGroup;
  stateForm: FormGroup;

  panelOpenState: boolean;

  snackBarOption: any = { duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom' };
  submitted: any = {};
  actionMessage: any = {};
  stateObject: any = {};
  editObject: any = {};
  exportObject: any = {};
  displayedColumns: any = ['id', 'name', 'created_date', 'updated_date', 'active', 'option'];
  dataSource: MatTableDataSource<any>;
  dialogComfirm: any = {};

  @ViewChild('snackBarTemplate', { static: false })
  snackBarTemplate: any =TemplateRef;

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  @ViewChild('addStateTemplate', { static: false })
  editStateTempate: any = TemplateRef;

  @ViewChild('editRegionalTemplate', { static: false })
  editRegionalTemplate: any = TemplateRef;

  constructor(
    private snackBarCtrl: MatSnackBar,
    private sheetCtrl: MatBottomSheet,
    private fb: FormBuilder,
    private dbService: NgxIndexedDBService,
  ) { }

  get f() {
    return this.regionalForm.controls;
  }

  get s() {
    return this.stateForm.controls;
  }

  private regionalFormBuilder() {
    this.regionalForm = this.fb.group({
      regionalName: ['', [Validators.required]]
    });
  }

  private stateFormBuilder() {
    this.stateForm  = this.fb.group({
      name: ['',[Validators.required]]
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  } 

  private getAll() {
    this.dbService.getAll('regional').then((result: any) => {
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

    this.dbService.update('regional',statusChangeObject).then(() => {
      this.actionMessage = 'လုပ်ဆောင်မှုအောင်မြင်ပါသည်';
      this.snackBarCtrl.openFromTemplate(this.snackBarTemplate, this.snackBarOption);
      this.getAll();
    });
    
  }

  openAddStateForm(element: any) {
    this.stateObject.title = element.name;
    this.stateObject.regional_id = element.id;
    this.stateObject.created_date = new Date();
    this.stateObject.updated_date = new Date();
    this.stateObject.active = 1;

    this.dialogComfirm = this.sheetCtrl.open(this.editStateTempate);
  }

  openEditRegionalForm(element:any) {
    this.editObject = element;
    this.f.regionalName.setValue(element.name);
    this.dialogComfirm = this.sheetCtrl.open(this.editRegionalTemplate);
  }

  saveState() {
    this.submitted.state = true;

    if(this.stateForm.invalid) {
      this.submitted.state = false;
      return;
    }

    this.dbService.getByIndex('state', 'name', this.s.name.value).then((result: any) => {
      
      this.stateObject.name = this.s.name.value;

      if(result === undefined) {
        this.dbService.add('state', this.stateObject).then(() => {
          this.actionMessage = this.stateObject.name + ', မြို့နယ်စာရင်းထဲသို့ထည့်သွင်းခြင်းအောင်မြင်ပါသည်';
          this.snackBarCtrl.openFromTemplate(this.snackBarTemplate, this.snackBarOption);
          this.dialogComfirm.dismiss();
          this.getAll();
        });
      }

      if(result) {
        this.actionMessage = this.stateObject.name + ', မြို့နယ်စာရင်းထဲတွင် ရှိနေပါသည်';
        this.snackBarCtrl.openFromTemplate(this.snackBarTemplate, this.snackBarOption);
      }
    });

    this.submitted.state = false;
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

  onSubmit() {
    this.submitted.add = true;

    if(this.regionalForm.invalid) {
      this.submitted.add = false;
      return;
    }

    let addObject = { name: this.f.regionalName.value, created_date: new Date(), updated_date: new Date(), active : 1 }

    this.dbService.getByIndex('regional', 'name', this.f.regionalName.value).then((result: any) => {
      if(result === undefined) {
        this.dbService.add('regional', addObject).then(() => {
          this.actionMessage = 'ပြည်နယ်နှင့်တိုင်းဒေသကြီးနာမည်ထည့်ခြင်းအောင်မြင်ပါသည်';
          this.snackBarCtrl.openFromTemplate(this.snackBarTemplate, this.snackBarOption);
          this.getAll();
        });
      }

      if(result) {
        this.actionMessage = this.f.regionalName.value + ' သည် ပြည်နယ်နှင့်တိုင်းဒေသကြီးစာရင်းထဲတွင် ထည့်သွင်းပြီးသားဖြစ်နေပါသည်။';
        this.snackBarCtrl.openFromTemplate(this.snackBarTemplate, this.snackBarOption);
      }
    });

    this.submitted.add = false;
  }

  editRegional() {
    this.submitted.edit = true;

    if(this.regionalForm.invalid) {
      this.submitted.edit = false;
      return;
    }

    this.editObject.name = this.f.regionalName.value;
    this.editObject.updated_date = new Date();

    this.dbService.update('regional',this.editObject).then(() => {
      this.getAll();
      this.actionMessage = 'ပြင်ဆင်မှုအောင်မြင်ပါသည်';
      this.snackBarCtrl.openFromTemplate(this.snackBarTemplate, this.snackBarOption);
      this.dialogComfirm.dismiss();
    });

    this.submitted.edit = false;
  }

  ngOnInit() {
    this.panelOpenState = true;

    this.regionalFormBuilder();
    this.stateFormBuilder();
    this.getAll();
  }

}
