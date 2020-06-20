import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor() { this.exibirTabs(); }

  exibirTabs() {
    const elements = document.querySelectorAll('ion-tab-bar');
    Object.keys(elements).map((key) => {
      elements[key].style.display = 'flex';
    });
  }

}
