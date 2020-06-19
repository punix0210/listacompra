import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaAddPageRoutingModule } from './lista-add-routing.module';

import { ListaAddPage } from './lista-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaAddPageRoutingModule
  ],
  declarations: [ListaAddPage]
})
export class ListaAddPageModule {}
