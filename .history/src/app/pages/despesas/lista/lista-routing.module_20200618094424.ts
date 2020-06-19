import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPage } from './lista.page';

const routes: Routes = [
  {
    path: '',
    component: ListaPage,
    children:
      [
        {
          path: 'lista-add',
          loadChildren: () => import('../lista-add/lista-add.module').then(m => m.ListaAddPageModule)
        },
        {
          path: 'lista-items',
          loadChildren: () => import('../lista-items/lista-items.module').then(m => m.ListaItemsPageModule)
        },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaPageRoutingModule { }
