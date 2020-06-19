import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lista } from 'src/app/shared/model/lista';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListaService } from 'src/app/shared/service/lista.service';

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

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const nav = this.router.getCurrentNavigation();

      if (nav === undefined) {
        return;
      }

      switch (id) {
        case '0':
          this.title = 'Nova Lista';
          this.createForm(new Lista(0, '', '', 0.00));
          break;
        default:
          this.title = 'Editar Lista';
          this.service.findById(id).subscribe((response) => {
            this.createForm(response);
          });
      }
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


  onSave() {
    alert('gravou')
  }

}
