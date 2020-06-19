import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-add',
  templateUrl: './lista-add.page.html',
  styleUrls: ['./lista-add.page.scss'],
})
export class ListaAddPage implements OnInit {

  public title: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute) {

    this.route.paramMap.subscribe(params => {
      const nav = this.router.getCurrentNavigation();
      if (nav !== undefined) {
        const id = params.get('id');
        switch (id) {
          case '0': this.title = 'Nova Lista'; break;
          default: this.title = 'Editar Lista';
        }
      } else {
        return;
      }

    });

  }


  ngOnInit() {
  }

}
