import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-moneylist',
  templateUrl: './moneylist.component.html',
  styleUrls: ['./moneylist.component.css']
})
export class MoneylistComponent implements OnInit {

  showlists : [];

  moneylists = JSON.parse(localStorage.getItem('item')) || [] ;

  moneylist:string;

  constructor() { }

  ngOnInit() {

    localStorage.removeItem('item');

    this.showlists = JSON.parse(localStorage.getItem("item"));

    return this.showlists;
  }

  saveMoneyList(){

    this.moneylists.push(this.moneylist);

    localStorage.setItem("item", JSON.stringify(this.moneylists));

    this.showlists = JSON.parse(localStorage.getItem("item"));

    this.moneylist = '';

    return this.showlists;
  }
}
