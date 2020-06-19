import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaAddPageRoutingModule } from './lista-add-routing.module';

import { ListaAddPage } from './lista-add.page';

import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrMaskerModule,
    IonicModule,
    ListaAddPageRoutingModule
  ],
  declarations: [ListaAddPage]
})
export class ListaAddPageModule { }
