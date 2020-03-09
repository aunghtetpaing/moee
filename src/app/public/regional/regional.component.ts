import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { MatSnackBar, MatPaginator, MatTableDataSource, MatBottomSheet } from '@angular/material';

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
  actionMessage: any = {};
  stateObject: any = {};
  displayedColumns: any = ['id', 'name', 'created_date', 'updated_date', 'active', 'option'];
  dataSource: MatTableDataSource<any>;
  dialogComfirm: any = {};

  @ViewChild('snackBarTemplate', { static: false })
  snackBarTemplate: any =TemplateRef;

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  @ViewChild('editStateTempate', { static: false })
  editStateTempate: any = TemplateRef;

  constructor(
    private snackBarCtrl: MatSnackBar,
    private sheetCtrl: MatBottomSheet,
    private fb: FormBuilder,
    private dbService: NgxIndexedDBService
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

  private getAll() {
    this.dbService.getAll('regional').then((result: any) => {
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

  addState(element: any) {
    this.stateObject.title = element.name;
    this.stateObject.regional_id = element.id;
    this.stateObject.created_date = new Date();
    this.stateObject.updated_date = new Date();
    this.stateObject.active = 1;

    this.dialogComfirm = this.sheetCtrl.open(this.editStateTempate);
  }

  updated(element:any) {
    return element;
  }

  saveState() {
    
    if(this.stateForm.invalid) {
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
  }

  onSubmit() {
    
    if(this.regionalForm.invalid) {
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
  }

  ngOnInit() {
    this.panelOpenState = true;

    this.regionalFormBuilder();
    this.stateFormBuilder();
    this.getAll();
  }

}
