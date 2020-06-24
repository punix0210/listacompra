import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Lista } from 'src/app/shared/model/lista';
import { ListaService } from 'src/app/shared/service/lista.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  public items: Lista[] = [];

  constructor(
    private alertController: AlertController,
    private router: Router,
    private service: ListaService) {
    console.log('ListaPage');
  }

  ngOnInit() {

    this.service.fetchDespesas().subscribe((res) => {
      this.items = res;
    });

    // setTimeout(() => {
    //   this.exibirTabs();
    // }, 300);

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

  async onDeleteDialog(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Excluir',
      message: 'Confirma excluir lista?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: async () => {
            await this.onDelete(id);
          }
        }
      ]
    });

    await alert.present();

  }

  async onDelete(id) {

    let res = await this.service.delete(id);

    if (res.success) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Sucesso!',
        subHeader: '',
        message: 'Exclusão realizada com sucesso!',
        buttons: ['OK']
      });
      await alert.present();
    }

  }

}
