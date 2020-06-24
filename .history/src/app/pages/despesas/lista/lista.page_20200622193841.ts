import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Lista } from 'src/app/shared/model/lista';
import { ListaService } from 'src/app/shared/service/lista.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  public items: Lista[] = [];

  constructor(
    private router: Router,
    private service: ListaService) { }

  async findAll() {
    let res = await this.service.findAll();
    this.items = res.data;
  }

  ngOnInit() {
    this.findAll();
    setTimeout(() => {
      this.exibirTabs();
    }, 300);
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
