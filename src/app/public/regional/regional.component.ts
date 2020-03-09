import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { MatSnackBar, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-regional',
  templateUrl: './regional.component.html',
  styleUrls: ['./regional.component.css']
})
export class RegionalComponent implements OnInit {

  regionalForm: FormGroup;
  panelOpenState: boolean;
  snackBarOption: any = { duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom' };
  actionMessage: any = {};
  displayedColumns: any = ['id', 'name', 'created_date', 'update_date', 'option'];
  dataSource: MatTableDataSource<any>;

  @ViewChild('snackBarTemplate', { static: false })
  snackBarTemplate: any =TemplateRef;

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  constructor(
    private snackBarCtrl: MatSnackBar,
    private fb: FormBuilder,
    private dbService: NgxIndexedDBService
  ) { }

  get f() {
    return this.regionalForm.controls;
  }

  private regionalFormBuilder() {
    this.regionalForm = this.fb.group({
      regionalName: ['', [Validators.required]]
    });
  }

  private getAll() {
    this.dbService.getAll('regional').then((result: any) => {
      console.log(result);
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
    });
  }

  onSubmit() {
    
    if(this.regionalForm.invalid) {
      return;
    }

    let addObject = { name: this.f.regionalName.value, created_date: new Date(), updated_date: new Date() }

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
    this.getAll();
  }



}
