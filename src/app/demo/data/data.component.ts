import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DataService } from 'src/app/cores/services/data.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatBottomSheet } from '@angular/material';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  panelOpenState = true;
  actionMessage: any = {};
  updateDataSource: any = {};
  dialogConfirm: any = {};
  ngModel: any = {};
  snackBarOption: any = { duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom' };
  displayedColumns: any = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild('snackBarTemplate', { static: false})
  private snackBarTemplate: any = TemplateRef;

  @ViewChild('updateTemplate', { static: false })
  private updateTemplate: any = TemplateRef;

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  constructor(
    private snackBarCtrl: MatSnackBar,
    private bottomSheetCtrl: MatBottomSheet,
    private dataService: DataService,
    private dbService: NgxIndexedDBService
  ) { }

  addUser() {
    let createUser: string = this.dataService.generateUser();

    this.dbService.getByIndex('user', 'username', createUser).then((check: any) => {

      if(check) {
        this.actionMessage = createUser + ' is alerady exist!';
        this.snackBarCtrl.openFromTemplate(this.snackBarTemplate, this.snackBarOption);
      }

      if(check === undefined) {
        let userObject = { username: createUser, password: '123456', created_date: new Date(), updated_date: new Date() };

        this.dbService.add('user',userObject).then((result: any) => {
          this.getAll('user');
          this.actionMessage = createUser + ' have been created!';
          this.snackBarCtrl.openFromTemplate(this.snackBarTemplate, this.snackBarOption);
        });
      }

    });
  }

  clean(table: string) {
    this.dbService.clear(table).then(() => {
      this.getAll('user');
      this.actionMessage = table + ' table have been clean!';
      this.snackBarCtrl.openFromTemplate(this.snackBarTemplate, this.snackBarOption);
    });
  }

  getAll(table: string) {

    if(table === 'user') {
      this.displayedColumns = ['id','username', 'password', 'created_date', 'updated_date', 'option'];
    }

    this.dbService.getAll(table).then((result: any) => {
      this.dataSource = new MatTableDataSource<any>(result);
      this.dataSource.paginator = this.paginator;
    });
  }

  remove(table: string, id: number) {
    this.dbService.delete(table, id).then(() => {
      this.actionMessage = table + 'id - ' + id + ' is deleted!';
      this.snackBarCtrl.openFromTemplate(this.snackBarTemplate, this.snackBarOption);
    });
  }

  deleteDatabase() {
    this.dbService.deleteDatabase().then(() => {
      this.actionMessage = 'Indexdb Database is deleted';
      this.snackBarCtrl.openFromTemplate(this.snackBarTemplate, this.snackBarOption);
      this.getAll('user');
    });
  }

  update(table: string, data: any) {
    this.updateDataSource = data;
    this.dialogConfirm = this.bottomSheetCtrl.open(this.updateTemplate);
  }

  updateSaveConfrim(table: string, data: any) {
   
    if(this.ngModel.username === '' || this.ngModel.password === '') {
      this.actionMessage = 'Username and password are required';
      this.snackBarCtrl.openFromTemplate(this.snackBarTemplate, this.snackBarOption);

    } else {
      let updateObject = {id: data.id, username: this.ngModel.username, password: this.ngModel.password, created_date: data.created_date, updated_date: new Date() };

      this.dbService.update(table, updateObject).then(() => {
        this.actionMessage = "Update Complete";
        this.dialogConfirm.dismiss();
        this.getAll(table);
      });
    }
  }

  regional() {
    this.dataService.installRegional();
  }

  ngOnInit() {
    this.getAll('user');
  }


}
