import {Component, OnInit} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlattener, MatTreeFlatDataSource} from '@angular/material';
import {DataService} from 'src/app/cores/services/data.service';

interface NavNode {
  name: string;
  icon: string;
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
    icon: 'dashboard',
    url: 'regional',
  },
  {
    name: 'ယူနစ်များရေးသွင်းရန်',
    icon: 'settings',
    url: 'regional',
    children: [
      {
        name: 'ပြည်နယ်နှင့်တိုင်းဒေသကြီးများ',
        icon: 'adjust',
        url: '/regional'
      },
    ]
  },
  {
    name: 'မီတာစာရင်းသွင်းရန်',
    icon: 'insert_drive_file',
    url: 'regional',
    children: [
      {
        name: 'ပြည်နယ်နှင့်တိုင်းဒေသကြီးများ',
        icon: 'adjust',
        url: '/regional'
      },
    ]
  },
  {
    name: 'ယူနစ်အလွှာသတ်မှတ်ချက်',
    icon: 'assessment',
    url: 'regional',
    children: [
      {
        name: 'ယူနစ်နှုန်းထားစာရင်း',
        icon: 'adjust',
        url: '/unit-specification'
      },
    ]
  },
  {
    name: 'လယ်ဂျာစာအုပ်များ',
    icon: 'menu_book',
    url: 'regional',
    children: [
      {
        name: 'လယ်ဂျာစာအုပ်အသစ်ပြုလုပ်ရန်',
        icon: 'adjust',
        url: '/create-leagerbook'
      },
    ]
  },
  {
    name: 'မီတာများ',
    icon: 'flash_on',
    url: 'regional',
    children: [
      {
        name: 'မီတာအမျိုးအစား'
        icon: 'adjust',
        url: '/metertype'
      },
      {
        name: 'မီတာစာရင်းသွင်းရန်',
        icon: 'adjust',
        url: '/add-meter'
      },
   },
   {
    name: 'မီတာများ',
    icon: 'flash_on',
    children: [
      { name: 'ပြည်နယ်နှင့်တိုင်းဒေသကြီးများ', url: '/regional' },
      { name: 'မြို့နယ်များ', url: '/division' },
      { name: 'မီတာရုံ', url: '/meter-office' }
    ]
  },
  {
    name: 'ငွေစာရင်း',
    url: '',
    children: [
      { name: 'ငွေစာရင်းများအားကြည့်ရန်', url: '/money-type' }
    ]
<<<<<<< HEAD
  }
=======
  },
  {
    name: 'ထရမ်စဖေါ်မာ',
    url: '',
    children: [
      { name: 'ထရမ်စဖေါ်မာစာရင်းသွင်းရန်', url: '/transformer' }
    ]
  },

>>>>>>> 55cb0ea4e03e81c11aec64ebe52d17d6734b408f
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
      icon: node.icon,
      name: node.name,
      url: node.url,
      level: level,
    };
  };

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
