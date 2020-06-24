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
          this.service.findById(id).then((response) => {
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


  async onSave() {
    const lista = this.formLista.value as Lista;

    const respo = await this.service.save(lista);

    if (respo === true) {
      this.router.navigate(['tabs/lista']);
      this.service.findAll();
    }

    console.log(respo);

    // if (lista.id !== 0) {
    //   this.service.save(lista).subscribe((res) => {
    //     this.router.navigate(['tabs/lista']);
    //   }, err => {
    //     console.log('error' + err);
    //     return;
    //   });
    // } else {
    //   this.service.put(lista).subscribe((res) => {
    //   }, err => {
    //     return;
    //     console.log('error' + err);
    //   });
    // }



  }

}
