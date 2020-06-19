import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'lista',
        loadChildren: () => import('../pages/despesas/lista/lista.module').then( m => m.ListaPageModule)
      },
      {
        path: 'lista-add',
        loadChildren: () => import('../pages/despesas/lista-add/lista-add.module').then( m => m.ListaAddPageModule)
      },
      {
        path: 'lista-items',
        loadChildren: () => import('../pages/despesas/lista-items/lista-items.module').then( m => m.ListaItemsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/lista',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/lista',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
