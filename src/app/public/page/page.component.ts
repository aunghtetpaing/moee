import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSnackBar, MatPaginator, MatBottomSheet } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})

export class PageComponent implements OnInit {

  id: string;
  leagerPageForm: FormGroup;
  leagerBook: any = {};

  dataSource: MatTableDataSource<any>;
  displayedColumns: any = ['id', 'page', 'created_date', 'updated_date', 'option'];

  dialogComfirm: any = {};
  actionMessage: string = null;
  snackBarOption: any = { duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom' };

  editObject: any = {};

  @ViewChild('snackBarTemplate', { static: false }) snackBarTemplate: any = TemplateRef;
  @ViewChild(MatPaginator, { static: false }) matPaginator: any = MatPaginator;
  @ViewChild('editLeagerPageTemplate', { static: false }) editLeagerPageTemplate: any = TemplateRef;

  constructor(
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private snackBarCtrl: MatSnackBar,
    private sheetCtrl: MatBottomSheet,
    private dbService: NgxIndexedDBService
  ) { 

    this.activeRoute.paramMap.subscribe((url: any) => {
      this.id = url.params.id;
    });

    this.dbService.getByID('leagerbook',this.id).then((result: any) => {
      this.leagerBook = result;
    });
  }

  get getLeagerPageControl() {
    return this.leagerPageForm.controls;
  }

  private leagerPageFormBuilder() {
    this.leagerPageForm = this.fb.group({
      name: [null,[Validators.required]]
    });
  }

  private getAll() {
    this.dbService.getAll('leager_page').then((result: any) => {
      let data: any = [];

      for (let i=0; i < result.length; i++) {
        if (result[i].book_id === this.id.toString()) {
            data.push(result[i]);
        }
      }
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.matPaginator;
    });
  }

  openLeagerPageTemplate(element: any) {
    this.editObject = element;
    this.dialogComfirm = this.sheetCtrl.open(this.editLeagerPageTemplate);
  }

  editLagerPage() {
    
    if(this.leagerPageForm.invalid) {
      return;
    }

    this.editObject.name = this.getLeagerPageControl.name.value;

    this.dbService.update('leager_page',this.editObject).then(() => {
      this.actionMessage = 'ပြင်ဆင်မှုအောင်မြင်ပါသည်';
      this.snackBarCtrl.openFromTemplate(this.snackBarTemplate,this.snackBarOption);
      this.dialogComfirm.dismiss();
      this.getAll();
    });
  }

  createLeagerPage() {
    if(this.leagerPageForm.invalid) {
      return;
    }

    const object = {
      name: this.getLeagerPageControl.name.value,
      book_id: this.id,
      created_date: new Date(),
      updated_date: new Date(),
      active: 1
    }

    this.dbService.add('leager_page', object).then(() => {
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
