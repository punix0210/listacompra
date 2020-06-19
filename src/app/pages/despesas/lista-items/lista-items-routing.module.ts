import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaItemsPage } from './lista-items.page';

const routes: Routes = [
  {
    path: '',
    component: ListaItemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaItemsPageRoutingModule {}
