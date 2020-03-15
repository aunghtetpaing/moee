import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatPaginator, MatBottomSheet } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-metertype',
  templateUrl: './metertype.component.html',
  styleUrls: ['./metertype.component.css']
})

export class MetertypeComponent implements OnInit {

  meterTypeForm: FormGroup;
  leagerBook: any = {};

  dataSource: MatTableDataSource<any>;
  displayedColumns: any = ['id', 'name', 'created_date', 'updated_date', 'active', 'option'];

  dialogComfirm: any = {};
  actionMessage: string = null;
  snackBarOption: any = { duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom' };

  editObject: any = {};

  @ViewChild('snackBarTemplate', { static: false }) snackBarTemplate: any = TemplateRef;
  @ViewChild(MatPaginator, { static: false }) matPaginator: any = MatPaginator;
  @ViewChild('editTemplate', { static: false }) editTemplate: any = TemplateRef;

  constructor(
    private fb: FormBuilder,
    private snackBarCtrl: MatSnackBar,
    private sheetCtrl: MatBottomSheet,
    private dbService: NgxIndexedDBService
  ) { }

  get getMeterTypeControl() {
    return this.meterTypeForm.controls;
  }

  private leagerPageFormBuilder() {
    this.meterTypeForm = this.fb.group({
      name: [null,[Validators.required]]
    });
  }

  private getAll() {
    this.dbService.getAll('metertype').then((result: any) => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.matPaginator;
    });
  }

  openEditTemplate(element: any) {
    this.editObject = element;
    this.dialogComfirm = this.sheetCtrl.open(this.editTemplate);
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

    this.dbService.update('metertype',statusChangeObject).then(() => {
      this.actionMessage = 'လုပ်ဆောင်မှုအောင်မြင်ပါသည်';
      this.snackBarCtrl.openFromTemplate(this.snackBarTemplate, this.snackBarOption);
      this.getAll();
    });
    
  }

  edit() {
    
    if(this.meterTypeForm.invalid) {
      return;
    }

    this.editObject.name = this.getMeterTypeControl.name.value;

    this.dbService.update('metertype',this.editObject).then(() => {
      this.actionMessage = 'ပြင်ဆင်မှုအောင်မြင်ပါသည်';
      this.snackBarCtrl.openFromTemplate(this.snackBarTemplate,this.snackBarOption);
      this.dialogComfirm.dismiss();
      this.getAll();
    });
  }

  create() {
    if(this.meterTypeForm.invalid) {
      return;
    }

    const object = {
      name: this.getMeterTypeControl.name.value,
      created_date: new Date(),
      updated_date: new Date(),
      active: 1
    }

    this.dbService.add('metertype', object).then(() => {
      this.actionMessage = 'စာရင်းသွင်းမှုအောင်မြင်ပါသည်';
      this.snackBarCtrl.openFromComponent(this.snackBarTemplate, this.snackBarOption);
      this.getAll();
    });

  }

  ngOnInit() {
    this.getAll();
    this.leagerPageFormBuilder();
  }

}
