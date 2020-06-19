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
  }

  onCreate() {
    console.log('Teste');

    const navigation: NavigationExtras = {
      state:
      {
        status: 'I'
      }
    };

    this.router.navigate(['tabs/lista/lista-add'], navigation);
  }

}
