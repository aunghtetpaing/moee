import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { MatPaginator, MatSnackBar, MatTableDataSource, MatBottomSheet } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transformer-detail',
  templateUrl: './transformer-detail.component.html',
  styleUrls: ['./transformer-detail.component.css']
})
export class TransformerDetailComponent implements OnInit {

  transformer_id: string = null;
  transformer: any = {};
  transformerFormRepairForm: FormGroup
  transformerForm: FormGroup;
  leagerBook: any = {};

  dataSource: MatTableDataSource<any>;
  displayedColumns: any = ['id', 'description', 'repair_date', 'created_date', 'updated_date', 'option'];

  dialogComfirm: any = {};
  actionMessage: string = null;
  snackBarOption: any = { duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom' };

  editObject: any = {};

  
  @ViewChild('snackBarTemplate', { static: false }) snackBarTemplate: any = TemplateRef;
  @ViewChild(MatPaginator, { static: false }) matPaginator: any = MatPaginator;
  @ViewChild('editTemplate', { static: false }) editTemplate: any = TemplateRef;

  constructor(
    private activeRouter: ActivatedRoute,
    private fb: FormBuilder,
    private snackBarCtrl: MatSnackBar,
    private sheetCtrl: MatBottomSheet,
    private dbService: NgxIndexedDBService
  ) {
    
    this.activeRouter.params.subscribe((params: any) => {
      this.transformer_id = params.id;
    });

    this.dbService.getByID('transformer',this.transformer_id).then((result: any) => {
      this.transformer = result;
    });
  }

  get getControls() {
    return this.transformerFormRepairForm.controls;
  }

  private formBuilder() {
    this.transformerFormRepairForm = this.fb.group({
      description: [null,[Validators.required]],
      repair_date: [null, [Validators.required]],
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  
  private getAll() {
    this.dbService.getAll('transformer_repair').then((result: any) => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.matPaginator;
    });
  }

  create() {
    if(this.transformerFormRepairForm.invalid) {
      return;
    }

    const object = {
      repair_date: this.getControls.repair_date.value,
      description: this.getControls.description.value,
      created_date: new Date(),
      updated_date: new Date(),
      active: 1
    }

    this.dbService.add('transformer_repair', object).then(() => {
      this.actionMessage = 'စာရင်းသွင်းမှုအောင်မြင်ပါသည်';
      this.snackBarCtrl.openFromComponent(this.snackBarTemplate, this.snackBarOption);
      this.getAll();
    });

  }

  openTemplate(element: any) {
    this.editObject = element;
    this.dialogComfirm = this.sheetCtrl.open(this.editTemplate);
  }

  edit() {
    
    if(this.transformerFormRepairForm.invalid) {
      return;
    }

    this.editObject.description = this.getControls.description.value;
    this.editObject.repair_date = this.getControls.repair_date.value;
    this.editObject.updated_date = new Date();

    this.dbService.update('transformer_repair',this.editObject).then(() => {
      this.actionMessage = 'ပြင်ဆင်မှုအောင်မြင်ပါသည်';
      this.snackBarCtrl.openFromTemplate(this.snackBarTemplate,this.snackBarOption);
      this.dialogComfirm.dismiss();
      this.getAll();
    });
  }


  ngOnInit() {
    this.formBuilder();
    this.getAll();
  }

}
