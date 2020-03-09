import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-moneylist',
  templateUrl: './money-list-type.component.html',
  styleUrls: ['./money-list-type.component.css']
})
export class MoneylistTypeComponent implements OnInit {

  showlists : [];

  moneylists = JSON.parse(localStorage.getItem('moneylists')) || [] ;

  moneylist:string;

  constructor() { }

  ngOnInit() {

    this.showlists = JSON.parse(localStorage.getItem("moneylists"));

    return this.showlists;
  }

  saveMoneyList(){

    this.moneylists.push(this.moneylist);

    localStorage.setItem("moneylists", JSON.stringify(this.moneylists));

    this.showlists = JSON.parse(localStorage.getItem("moneylists"));

    this.moneylist = '';

    return this.showlists;
  }

  deleteMoneyList(index) {

    this.moneylists.splice(index, 1);

    localStorage.setItem("moneylists", JSON.stringify(this.moneylists));

    this.showlists = JSON.parse(localStorage.getItem("moneylists"));

    return this.showlists;

  }

}
