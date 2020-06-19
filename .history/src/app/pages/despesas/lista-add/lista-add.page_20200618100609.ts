import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-add',
  templateUrl: './lista-add.page.html',
  styleUrls: ['./lista-add.page.scss'],
})
export class ListaAddPage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    console.log(nav.extras.state);

  }

}
