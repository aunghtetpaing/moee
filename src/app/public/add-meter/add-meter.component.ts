import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-add-meter',
  templateUrl: './add-meter.component.html',
  styleUrls: ['./add-meter.component.css']
})
export class AddMeterComponent implements OnInit {

  meterForm: FormGroup;
  meterType: any = [];
  moneyType: any = [];

  actionMessage: string = null;
  snackBarOption: any = { duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom' };

  dataSource: MatTableDataSource<any>;
  displayedColumns: any = ['id', 'start_date', 'meter_no', 'code', 'type', 'house_power', 'transformer', 'money_type', 'person_name', 'person_address', 'person_phone', 'active', 'created_date', 'updated_date', 'option'];

  @ViewChild('snackBarTemplate', { static: false }) snackBarTemplate: any = TemplateRef;
  @ViewChild(MatPaginator, { static: false }) matPaginator: any = MatPaginator;
  @ViewChild('editLeagerPageTemplate', { static: false }) editLeagerPageTemplate: any = TemplateRef;

  constructor(
    private dbService: NgxIndexedDBService,
    private snackBarCtrl: MatSnackBar,
    private fb: FormBuilder,
  ) { 

    this.dbService.getAll('metertype').then((result: any) => {
      this.meterType = result;
    });

    this.dbService.getAll('moneyType').then((result: any) => {
      this.moneyType = result;
    });
  }

  get getMeterFromControl() {
    return this.meterForm.controls;
  }

  formBuilder() {
   this.meterForm = this.fb.group({
    start_date: ['',[Validators.required]],
    meter_no: ['',[Validators.required]],
    code: ['', [Validators.required]],
    type: ['1', [Validators.required]],
    house_power: ['', [Validators.required]],
    transformer: ['', [Validators.required]],
    money_type: ['1', [Validators.required]],
    person_name: ['', [Validators.required]],
    person_address: ['', [Validators.required]],
    person_phone: ['', [Validators.required]]
   });
  }

  createMeter() {

    if(this.meterForm.invalid) {
      return;
    }

    let meterObject: any = {
      start_date: this.getMeterFromControl.start_date.value,
      meter_no: this.getMeterFromControl.meter_no.value,
      code: this.getMeterFromControl.code.value,
      type: this.getMeterFromControl.type.value,
      house_power: this.getMeterFromControl.house_power.value,
      transformer: this.getMeterFromControl.transformer.value,
      money_type: this.getMeterFromControl.money_type.value,
      person_name: this.getMeterFromControl.person_name.value,
      person_address: this.getMeterFromControl.person_address.value,
      person_phone: this.getMeterFromControl.person_phone.value,
      created_date: new Date(),
      updated_date: new Date(),
      active: 1
    }

    this.dbService.add('meter', meterObject).then((result: any) => {
      this.actionMessage = 'စာရင်းသွင်းမှုအောင်မြင်ပါသည်';
      this.snackBarCtrl.openFromTemplate(this.snackBarTemplate,this.snackBarOption);
      this.getAll();
    });
  }

  getAll () {
    this.dbService.getAll('meter').then((result: any) => {
      this.dataSource = new MatTableDataSource<any>(result);
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

    this.dbService.update('meter',statusChangeObject).then(() => {
      this.actionMessage = 'လုပ်ဆောင်မှုအောင်မြင်ပါသည်';
      this.snackBarCtrl.openFromTemplate(this.snackBarTemplate, this.snackBarOption);
      this.getAll();
    });
    
  }

  ngOnInit() {
    this.formBuilder();
    this.getAll();
  }

}
