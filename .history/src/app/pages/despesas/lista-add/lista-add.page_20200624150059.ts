import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lista } from 'src/app/shared/model/lista';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListaService } from 'src/app/shared/service/lista.service';
import { Lib } from 'src/app/shared/core/lib';

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
    private fb: FormBuilder,
    private service: ListaService) {

    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      const nav = this.router.getCurrentNavigation();

      if (nav === undefined) {
        return;
      }

      if (id === '0') {
        this.title = await 'Nova Lista';
        await this.createForm(new Lista(0, '', Lib.dateToString(new Date()), 0.00));
      } else {
        this.title = await 'Editar Lista';
        let response = await this.service.findById(id);
        await this.createForm(response.data);
      }

      // switch (id) {
      //   case '0':
      //     this.title = 'Nova Lista';
      //     this.createForm(new Lista(0, '', Lib.dateToString(new Date()), 0.00));
      //     break;
      //   default:
      //     this.title = 'Editar Lista';
      //     console.log('edit ' + id);
      //     let response = await this.service.findById(id);
      //     console.log(response);
      //     this.createForm(response.data);
      // }
    });

  }


  ngOnInit() {
  }

  createForm(lista: Lista) {
    this.formLista = this.fb.group({
      id: [lista.id],
      descricao: [lista.descricao, [Validators.required]],
      data: [lista.data],
      vlPrevisto: [lista.vlPrevisto]
    });
  }


  async onSave() {

    const lista = this.formLista.value as Lista;

    const res = await this.service.save(lista);

    if (res.success === false) {
      return;
    }

    this.router.navigate(['tabs/listas']);

  }

}
