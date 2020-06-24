import { Component, OnInit } from '@angular/core';
import { Lib } from 'src/app/shared/core/lib';

@Component({
  selector: 'app-lista-items',
  templateUrl: './lista-items.page.html',
  styleUrls: ['./lista-items.page.scss'],
})
export class ListaItemsPage implements OnInit {

  title = 'Items da Compra';

  constructor() { }

  ngOnInit() {
    this.actionTabs(true);
  }

  onAdd() {
    console.log('Add');
  }

  actionTabs(value) {
    Lib.actionTabs(value);
  }

}
