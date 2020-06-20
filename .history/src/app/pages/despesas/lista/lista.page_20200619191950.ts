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

  onCreate(id) {
    const navigation: NavigationExtras = {
      skipLocationChange: true,
      state:
      {
        status: 'I'
      }
    };

    this.router.navigate(['tabs/listas/lista', id], navigation);
  }

}
