import { Component, OnInit } from '@angular/core';
import { Lib } from '../shared/core/lib';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  public hiddenTabs: boolean;

  constructor() { }

  ngOnInit(): void {
    Lib.hiddenTabsAction().subscribe((res) => {
      this.hiddenTabs = res;
    });
  }



}
