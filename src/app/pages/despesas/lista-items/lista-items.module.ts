import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaItemsPageRoutingModule } from './lista-items-routing.module';

import { ListaItemsPage } from './lista-items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaItemsPageRoutingModule
  ],
  declarations: [ListaItemsPage]
})
export class ListaItemsPageModule {}
