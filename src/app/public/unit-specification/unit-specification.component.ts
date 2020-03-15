import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { MatSnackBar, MatTableDataSource, MatPaginator, MatBottomSheet } from '@angular/material';



@Component({
  selector: 'app-unit-specification',
  templateUrl: './unit-specification.component.html',
  styleUrls: ['./unit-specification.component.css']
})

export class UnitSpecificationComponent implements OnInit {
  public unit;
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
    private dbService: NgxIndexedDBService
    ) { }
    
    onSubmit(){
      this.addItem(this.unit);
    }

    addItem(data: string)
    {
      let unit = { name: data , created_date: new Date(), updated_date: new Date() };
      this.dbService.add('unit',unit).then((result: any) => {
        this.getAll('unit');
        this.actionMessage = data + ' have been created!';
        this.snackBarCtrl.openFromTemplate(this.snackBarTemplate, this.snackBarOption);
      });
    }
    
    getAll(table: string) {

      if(table === 'unit') {
        this.displayedColumns = ['id','name','created_date', 'updated_date', 'option'];
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
    
    update(table: string, data: any) {
      this.updateDataSource = data;
      this.dialogConfirm = this.bottomSheetCtrl.open(this.updateTemplate);
    }
    
    updateSaveConfrim(table: string, data: any) {
        let updateObject = {id: data.id, name: this.ngModel.name,created_date: new Date(),updated_date: new Date() };
        this.dbService.update(table, updateObject).then(() => {
          this.actionMessage = "Update Complete";
          this.dialogConfirm.dismiss();
          this.getAll(table);
        });
    }

  ngOnInit() {
    this.getAll('unit');
  }
}
