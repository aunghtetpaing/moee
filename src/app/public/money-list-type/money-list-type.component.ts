import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-moneylist',
  templateUrl: './money-list-type.component.html',
  styleUrls: ['./money-list-type.component.css']
})
export class MoneylistTypeComponent implements OnInit {

  
  displayedColumns: string[] = ['column1', 'column2'];

  showLists : [];

  moneyListTypes = JSON.parse(localStorage.getItem('moneylists')) || [] ;

  moneyListType:string;

  constructor() { }

  ngOnInit() {

    this.showLists = JSON.parse(localStorage.getItem("moneylists"));

    return this.showLists;
  }

  saveMoneyList(){

    if(this.moneyListType !== undefined){
        this.moneyListTypes.push(this.moneyListType);

        localStorage.setItem("moneylists", JSON.stringify(this.moneyListTypes));
    
        this.showLists = JSON.parse(localStorage.getItem("moneylists"));
    
        this.moneyListType = '';
    
        return this.showLists;
    }
  }

  deleteMoneyList(index) {

    this.moneyListTypes.splice(index, 1);

    localStorage.setItem("moneylists", JSON.stringify(this.moneyListTypes));

    this.showLists = JSON.parse(localStorage.getItem("moneylists"));

    return this.showLists;

  }

}
