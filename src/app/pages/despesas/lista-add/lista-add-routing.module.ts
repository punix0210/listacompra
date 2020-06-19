import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaAddPage } from './lista-add.page';

const routes: Routes = [
  {
    path: '',
    component: ListaAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaAddPageRoutingModule {}
