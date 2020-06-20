import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('init');
    setTimeout(() => {
      this.exibirTabs();
    });
  }

  onCreate(idCompra) {
    const navigation: NavigationExtras = {
      skipLocationChange: false,
      state:
      {
        status: 'I'
      }
    };

    this.router.navigate(['tabs/listas/compra', idCompra], navigation);
  }

  onCreateItems(idCompra) {
    const navigation: NavigationExtras = {
      skipLocationChange: false,
      state:
      {
        status: 'I'
      }
    };

    this.router.navigate([`tabs/listas/compra/${idCompra}/items`], navigation);
  }

  exibirTabs() {
    const elements = document.querySelectorAll('ion-tab-bar');
    Object.keys(elements).map((key) => {
      console.log(elements[key].style.display);
      elements[key].style.display = 'flex';
    });

    console.log('entrou');
  }

}
