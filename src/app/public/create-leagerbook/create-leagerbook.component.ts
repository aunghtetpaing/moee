import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatSnackBar, MatPaginator, MatBottomSheet } from '@angular/material';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-create-leagerbook',
  templateUrl: './create-leagerbook.component.html',
  styleUrls: ['./create-leagerbook.component.css']
})

export class CreateLeagerbookComponent implements OnInit {

  leagerBookForm: FormGroup;
  dataSource: MatTableDataSource<any>;
  actionMessage: string = null;
  snackBarOption: any = { duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom' };
  displayedColumns: any = ['id', 'name', 'year', 'month', 'created_date', 'updated_date', 'active', 'option'];
  editObject: any = {};
  dialogComfirm: any = {};

  @ViewChild('snackBarTemplate', {static: false}) snackBarTemplate: any = TemplateRef;
  @ViewChild(MatPaginator, { static: false }) matPaginator: any = MatPaginator;
  @ViewChild('openLeagerEditTemplate', {static: false }) openLeagerEditTemplate: any = TemplateRef;


  constructor(
    private dbService: NgxIndexedDBService,
    private snackBarCtrl: MatSnackBar,
    private sheetCtrl: MatBottomSheet,
    private fb: FormBuilder
  ) { }
  
  get getLeagerBookControl () {
    return this.leagerBookForm.controls
  }

  private leagerBookFormBuilder() {
    this.leagerBookForm = this.fb.group({
      name: ['',[Validators.required]],
      getDate: ['', [Validators.required]],
    })
  }

  private getAll() {
    this.dbService.getAll('leagerbook').then((result: any) => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.matPaginator;
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
    statusChangeObject.year = acitiveStatus.year;
    statusChangeObject.month = acitiveStatus.month;
    statusChangeObject.created_date = acitiveStatus.created_date;
    statusChangeObject.updated_date = new Date();

    this.dbService.update('leagerbook',statusChangeObject).then(() => {
      this.actionMessage = 'လုပ်ဆောင်မှုအောင်မြင်ပါသည်';
      this.snackBarCtrl.openFromTemplate(this.snackBarTemplate, this.snackBarOption);
      this.getAll();
    });
    
  }

  openLeagerEditTemplateForm(element: any) {
    this.editObject = element;
    this.dialogComfirm = this.sheetCtrl.open(this.openLeagerEditTemplate);
  }

  editLeagerBook(element: any) {

    if(this.leagerBookForm.invalid) {
      return;
    }
    this.editObject = element;
    this.editObject.name = this.getLeagerBookControl.name.value;
    this.editObject.year = new Date(this.getLeagerBookControl.getDate.value).getUTCFullYear();
    this.editObject.month = new Date(this.getLeagerBookControl.getDate.value).getUTCMonth() + 1;
    this.editObject.updated_date = new Date();

    this.dbService.update('leagerbook',this.editObject).then(() => {
      this.getAll();
      this.actionMessage = 'ပြင်ဆင်မှုအောင်မြင်ပါသည်';
      this.snackBarCtrl.openFromTemplate(this.snackBarTemplate, this.snackBarOption);
      this.dialogComfirm.dismiss();
    });

  }

  createNewLeagerBook() {
    
    if(this.leagerBookForm.invalid) {
      return;
    }

    const newLeagerbookObject = {
      name: this.getLeagerBookControl.name.value,
      opendate: this.getLeagerBookControl.getDate.value,
      year: new Date(this.getLeagerBookControl.getDate.value).getUTCFullYear(),
      month: new Date(this.getLeagerBookControl.getDate.value).getUTCMonth() + 1,
      created_date: new Date(),
      updated_date: new Date(),
      active: 1
    }

    this.dbService.add('leagerbook', newLeagerbookObject).then(() => {
      this.actionMessage = 'စာရင်းသွင်းမှုအောင်မြင်ပါသည်';
      this.snackBarCtrl.openFromTemplate(this.snackBarTemplate, this.snackBarOption);
      this.getAll();
    });

  }

  ngOnInit() {
    this.leagerBookFormBuilder();
    this.getAll();
  }

}
