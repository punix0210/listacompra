import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-items',
  templateUrl: './lista-items.page.html',
  styleUrls: ['./lista-items.page.scss'],
})
export class ListaItemsPage implements OnInit {

  title = 'Items da Compra';

  constructor() { }

  ngOnInit() {
    this.ocultarTabs();
  }

  onAdd() {
    console.log('Add');
  }


  ocultarTabs() {
    const elements = document.querySelectorAll('.tabbar');
    Object.keys(elements).map((key) => {
      elements[key].style.display = 'none';
    });
  }

}
