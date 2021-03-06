import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPageRoutingModule } from './lista-routing.module';

import { ListaPage } from './lista.page';
import { ListaService } from 'src/app/shared/service/lista.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPageRoutingModule
  ],
  declarations: [ListaPage],
  // providers: [ListaService]
})
export class ListaPageModule { }
