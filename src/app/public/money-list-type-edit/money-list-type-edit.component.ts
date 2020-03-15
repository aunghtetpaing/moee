import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-money-list-type-edit',
  templateUrl: './money-list-type-edit.component.html',
  styleUrls: ['./money-list-type-edit.component.css']
})
export class MoneyListTypeEditComponent implements OnInit {

  moneyListTypes : [];

  moneyListType;

  index;

  constructor(
    private router:Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.moneyListTypes = JSON.parse(localStorage.getItem("moneylists"));

    this.moneyListType=this.moneyListTypes[this.getId()];

    this.moneyListType;
    
  }

  getId() {
    return this.route.snapshot.paramMap.get('id');
  }

  editMoneyList(value) {

    this.moneyListTypes[this.getId()] = this.moneyListType;

    localStorage.setItem("moneylists", JSON.stringify(this.moneyListTypes));

    this.router.navigateByUrl('/money-list-type');
    
  }

}
