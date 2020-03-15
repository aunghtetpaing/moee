import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Router } from '@angular/router';
import { error } from 'protractor';

@Component({
  selector: 'app-unit-specification-detail',
  templateUrl: './unit-specification-detail.component.html',
  styleUrls: ['./unit-specification-detail.component.css']
})

export class UnitSpecificationDetailComponent implements OnInit {
  id: any;
  unit: any;
  action_msg: any;
  formData: FormGroup;
  displayedColumns: any = [
    'id', 'name', 'amount', 'options'
  ]
  homeEdit: any = 0;
  industryEdit: any = 0;
  homeTemData: any = [];
  editHomeTemData: any = [];
  industryTemData: any = [];
  editIndustryTemData: any = [];
  homeProgress: boolean = false;
  industryProgress: boolean = false;
  removeHomeData: any = [];
  removeIndustryData: any = [];
  displayedHomeData: MatTableDataSource<any>;
  displayedIndustryData: MatTableDataSource<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dbService: NgxIndexedDBService,
  ) {
    this.route.paramMap.subscribe((result) => {
      this.id = result["params"]["id"];
    })
  }

  async getHomeData() {
    await this.dbService.getAll('unit-specification-detail').then(
      result => {
        result = result.filter((value) => {
          return value["unit_specification_id"] === Number(this.id) && value["type_id"] === 1;
        });
        if (result.length !== 0) 
        this.homeEdit = 1;
        this.homeTemData = result;
        this.displayedHomeData = new MatTableDataSource(result);
      },
       error => {
      console.log(error)
      }
    );
  }

  getIndustryData() {
    this.dbService.getAll('unit-specification-detail').then(
      result => {
        result = result.filter((value) => {
          return value["unit_specification_id"] === Number(this.id) && value["type_id"] === 2;
        });
        if (result.length !== 0) 
        this.industryEdit = 1;
        this.industryTemData = result;
        this.displayedIndustryData = new MatTableDataSource(result);
      }
    );
  }

  get formValue() {
    return this.formData.controls;
  }

  createFormBuilder() {
    this.formData = this.formBuilder.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      amount: ['', [Validators.required]]
    })
  }

  create() {
    if (this.formData.invalid) return;
    const type = this.formValue.type.value;
    if (type === "1") {
      const data = {
        id: this.homeTemData.length + 1,
        name: this.formValue.name.value, 
        amount: this.formValue.amount.value,
        type_id: Number(type),
        unit_specification_id: Number(this.id),
        created_date: new Date(),
        updated_date: new Date(),
      };
      this.homeTemData.push(data);
      if (this.homeEdit === 1) {
       this.editHomeTemData.push(data);
      }
      this.displayedHomeData = new MatTableDataSource(this.homeTemData);
    } else {
      const data = {
        id: this.industryTemData.length + 1,
        name: this.formValue.name.value,
        amount: this.formValue.amount.value,
        type_id: Number(type),
        unit_specification_id: Number(this.id),
        created_date: new Date(),
        updated_date: new Date()
      };
      this.industryTemData.push(data)
      if (this.industryEdit === 1) {
        this.editIndustryTemData.push(data);
      }
      console.log(this.industryTemData);
      this.displayedIndustryData = new MatTableDataSource(this.industryTemData);
    }

    this.formData.reset();
    this.formValue.type.setErrors(null);
    this.formValue.name.setErrors(null);
    this.formValue.amount.setErrors(null);
  }

  removeHomeItem(value: any) {
    if (value) {
      if (this.homeEdit === 1) {
        this.removeHomeData.push(value.id)
      }
      const index = this.homeTemData.indexOf(value);
      this.homeTemData.splice(index, 1);
      this.displayedHomeData = new MatTableDataSource(this.homeTemData);
    }
  }

  removeIndustryItem(value: any) {
    if (value) {
      if (this.industryEdit === 1) {
        this.removeIndustryData.push(value.id)
      }
      const index = this.industryTemData.indexOf(value);
      this.industryTemData.splice(index, 1);
      this.displayedIndustryData = new MatTableDataSource(this.industryTemData);
    }
  }

  async getUnit() {
    return await this.dbService.getByID("unit-specification", Number(this.id)).then(
      (result) => {
        return result;
    })
  }

  async updateUnit(status: any) {
    var unit = await this.getUnit();
    unit["status"] = Number(status);
    this.dbService.update("unit-specification", unit).then((result) => {
        this.router.navigate(['/unit-specification']);
    })
  }

  async activateItem() {
    var unit = await this.getUnit();
    unit["status"] = 1;
    this.dbService.update("unit-specification", unit).then((result) => {
        this.router.navigate(['/unit-specification']);
    })
  }

  async storeHomeItems() {
    if (this.editHomeTemData.length === 0 && this.removeHomeData.length === 0) {
      this.homeProgress = true;
      await this.homeTemData.forEach(async (value : any) => {
        await this.dbService.add('unit-specification-detail', value).then(
          result => {
            console.log(result)
          },
          error => {
            console.log(error);
          }
        );
      });
      this.homeProgress = false;
    }

    if (this.editHomeTemData.length) {
      this.homeProgress = true;
      await this.editHomeTemData.forEach(async (value : any) => {
        await this.dbService.add('unit-specification-detail', value).then(
          result => {
            console.log(result)
          },
          error => {
            console.log(error);
          }
        );
      });
      this.homeProgress = false;
    }
    
    if (this.removeHomeData.length) {
      this.homeProgress = true;
      await this.removeHomeData.forEach(async (value : any) => {
        await this.dbService.delete('unit-specification-detail', value).then(
          result => {
            console.log(result)
          },
          error => {
            console.log(error);
          }
        );
      });
      this.homeProgress = false;
    }
  }

  async storeIndustryItems() {
    if (this.editIndustryTemData.length === 0 && this.removeIndustryData.length === 0) {
      this.industryProgress = true;
      await this.industryTemData.forEach(async (value : any) => {
        delete value["id"];
        await this.dbService.add('unit-specification-detail', value).then(
          result => {
            console.log(result)
          },
          error => {
            console.log(error);
          }
        );
      });
      this.industryProgress = false;
    }
    
    if (this.editIndustryTemData.length) {
      this.industryProgress = true;
      await this.editIndustryTemData.forEach(async (value : any) => {
        delete value["id"];
        await this.dbService.add('unit-specification-detail', value).then(
          result => {
            console.log(result)
          },
          error => {
            console.log(error);
          }
        );
      });
      this.industryProgress = false;
    }
    
    if (this.removeIndustryData.length) {
      console.log(this.removeIndustryData);
      this.industryProgress = true;
      await this.removeIndustryData.forEach(async (value : any) => {
        delete value["id"];
        await this.dbService.delete('unit-specification-detail', value).then(
          result => {
            console.log(result)
          },
          error => {
            console.log(error);
          }
        );
      });
      this.industryProgress = false;
    }
  }

  ngOnInit() {
    this.createFormBuilder()
    this.getHomeData();
    this.getIndustryData();
  }
}
