import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lista } from 'src/app/shared/model/lista';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListaService } from 'src/app/shared/service/lista.service';
import { Lib } from 'src/app/shared/core/lib';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-lista-add',
  templateUrl: './lista-add.page.html',
  styleUrls: ['./lista-add.page.scss'],
})
export class ListaAddPage implements OnInit {

  private listaId = '0';

  public title: string;

  public formLista: FormGroup;

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: ListaService) {

    this.route.paramMap.subscribe(params => {

      this.listaId = params.get('id');

      const nav = this.router.getCurrentNavigation();

      if (nav === undefined) {
        return;
      }

    });
  }


  ngOnInit() {
    this.actionTabs(true);
    switch (this.listaId) {
      case '0':
        this.title = 'Nova Lista';
        this.createForm(new Lista(0, '', Lib.dateToString(new Date()), 0.00));
        break;
      default:
        this.title = 'Editar Lista';
        this.presentLoading();
        this.service.findById(this.listaId).then((res) => {
          this.createForm(res.data);
        });
        break;
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Aguarde...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
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

    this.actionTabs(!res.success);

    this.router.navigate(['tabs/listas']);

  }

  actionTabs(value) {
    Lib.actionTabs(value);
  }

}
