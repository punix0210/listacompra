import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lista } from 'src/app/shared/model/lista';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-lista-add',
  templateUrl: './lista-add.page.html',
  styleUrls: ['./lista-add.page.scss'],
})
export class ListaAddPage implements OnInit {

  public title: string;

  public formLista: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const nav = this.router.getCurrentNavigation();

      if (nav === undefined) {
        return;
      }

      switch (id) {
        case '0':
          this.title = 'Nova Lista';

          break;
        default:
          this.title = 'Editar Lista';
      }
    });

  }


  ngOnInit() {
  }


  createForm(lista: Lista) {
    this.formLista = this.fb.group({
      id: [lista.id]
    });
  }

}
