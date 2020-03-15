import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { MatTableDataSource, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-unit-specification',
  templateUrl: './unit-specification.component.html',
  styleUrls: ['./unit-specification.component.css']
})

export class UnitSpecificationComponent implements OnInit {

  displayedColumns: any = [
      'id', 'name', 'status', 'date', 'options'
  ];

  displayedData: MatTableDataSource<any>;
  formData: FormGroup;
  action_msg: any

  @ViewChild('snackBar', { static: false }) snackBarTemplate: any = TemplateRef;

  constructor(
    private formBuilder: FormBuilder,
    private dbService: NgxIndexedDBService,
    private snackbarController: MatSnackBar,
  ) { }
  
  get formValue() {
    return this.formData.controls;
  }

  getData() {
    this.dbService.getAll('unit-specification').then((result) => {
      this.displayedData = new MatTableDataSource(result);
    })
  }

  insertData() {
    if (this.formData.invalid) return;

    const data = {
      name: this.formValue.name.value,
      status: 0,
      created_date: new Date(),
      updated_date: new Date()
    }

    this.dbService.add('unit-specification', data).then(() => {
        this.getData();
        this.action_msg = "Successful";
        this.formData.reset();
        this.formValue.name.setErrors(null);
        this.snackbarController.openFromTemplate(this.snackBarTemplate, { duration: 3000 });
      }
    )
  }
  
  private createFormBuilder() {
    this.formData = this.formBuilder.group({
      name: ['', [Validators.required]]
    })
  }


  ngOnInit() { 
    this.createFormBuilder()
    this.getData()
  }
}
