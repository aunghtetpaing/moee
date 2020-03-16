import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSnackBar, MatPaginator, MatBottomSheet } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-transformer',
  templateUrl: './transformer.component.html',
  styleUrls: ['./transformer.component.css']
})
export class TransformerComponent implements OnInit {

  id: string;
  transformerForm: FormGroup;
  leagerBook: any = {};

  dataSource: MatTableDataSource<any>;
  displayedColumns: any = ['id', 'name', 'code', 'type', 'volt', 'installation_date', 'created_date', 'updated_date', 'option'];

  dialogComfirm: any = {};
  actionMessage: string = null;
  snackBarOption: any = { duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom' };

  editObject: any = {};

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  @ViewChild('snackBarTemplate', { static: false }) snackBarTemplate: any = TemplateRef;
  @ViewChild(MatPaginator, { static: false }) matPaginator: any = MatPaginator;
  @ViewChild('editTemplate', { static: false }) editTemplate: any = TemplateRef;

  constructor(
    private fb: FormBuilder,
    private snackBarCtrl: MatSnackBar,
    private sheetCtrl: MatBottomSheet,
    private dbService: NgxIndexedDBService
  ) { }

  get getControls() {
    return this.transformerForm.controls;
  }

  private formBuilder() {
    this.transformerForm = this.fb.group({
      name: [null,[Validators.required]],
      code: [null, [Validators.required]],
      type: ['CT', [Validators.required]],
      volt: [null, [Validators.required]],
      installation_date: [null, [Validators.required]]
    });
  }

  private getAll() {
    this.dbService.getAll('transformer').then((result: any) => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.matPaginator;
    });
  }

  openTemplate(element: any) {
    this.editObject = element;
    this.dialogComfirm = this.sheetCtrl.open(this.editTemplate);
  }

  edit() {
    
    if(this.transformerForm.invalid) {
      return;
    }

    this.editObject.name = this.getControls.name.value;
    this.editObject.code = this.getControls.code.value;
    this.editObject.type = this.getControls.type.value;
    this.editObject.volt = this.getControls.volt.value;
    this.editObject.installation_date = this.getControls.installation_date.value;

    this.dbService.update('transformer',this.editObject).then(() => {
      this.actionMessage = 'ပြင်ဆင်မှုအောင်မြင်ပါသည်';
      this.snackBarCtrl.openFromTemplate(this.snackBarTemplate,this.snackBarOption);
      this.dialogComfirm.dismiss();
      this.getAll();
    });
  }

  create() {
    if(this.transformerForm.invalid) {
      return;
    }

    const object = {
      name: this.getControls.name.value,
      code: this.getControls.code.value,
      type: this.getControls.type.value,
      volt: this.getControls.volt.value,
      installation_date: this.getControls.installation_date.value,
      created_date: new Date(),
      updated_date: new Date(),
      active: 1
    }

    this.dbService.add('transformer', object).then(() => {
      this.actionMessage = 'စာရင်းသွင်းမှုအောင်မြင်ပါသည်';
      this.snackBarCtrl.openFromComponent(this.snackBarTemplate, this.snackBarOption);
      this.getAll();
    });

  }

  ngOnInit() {
    this.getAll();
    this.formBuilder();
  }

}
