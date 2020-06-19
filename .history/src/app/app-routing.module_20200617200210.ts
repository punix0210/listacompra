import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'lista',
    loadChildren: () => import('./pages/despesas/lista/lista.module').then( m => m.ListaPageModule)
  },
  {
    path: 'lista-add',
    loadChildren: () => import('./pages/despesas/lista-add/lista-add.module').then( m => m.ListaAddPageModule)
  },
  {
    path: 'lista-items',
    loadChildren: () => import('./pages/despesas/lista-items/lista-items.module').then( m => m.ListaItemsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
