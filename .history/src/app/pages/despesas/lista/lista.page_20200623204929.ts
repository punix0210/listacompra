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
    private service: ListaService) {
    this.service.findAll();
    console.log('constructor');
  }

  ngOnInit() {

    this.service.fetchDespesas().subscribe((res) => {
      this.items = res;
    });

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

  async onDelete(id) {
    console.log(id);
    let res = await this.service.delete(id);
    console.log(res);
    if (res.success) {
      alert('Exclusão realizada com sucesso!');
    }
  }

}
