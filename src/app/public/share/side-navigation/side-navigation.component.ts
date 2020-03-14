import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { DataService } from 'src/app/cores/services/data.service';

interface NavNode {
  name: string;
  url: string;
  children?: NavNode[];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

const TREE_DATA: NavNode[] = [
  {
    name: 'ထိန်းချုပ်ခြင်းများ',
    url: 'regional',
    children: [
      {name: 'ပြည်နယ်နှင့်တိုင်းဒေသကြီးများ', url: '/regional' },
      {name: 'မြို့နယ်များ', url: '/division' },
    ]
  },
];

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css']
})

export class SideNavigationComponent implements OnInit {

  private _transformer = (node: NavNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      url: node.url,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<FlatNode>(node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(
    this._transformer, 
    node => node.level, 
    node => node.expandable, 
    node => node.children
    );

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private dataService: DataService
  ) { 
    this.dataSource.data = TREE_DATA;
  }
  
  hasChild = (_: number, node: FlatNode) => node.expandable;

  ngOnInit() {
  }

  
}