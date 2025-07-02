import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionHistoryPage } from './production-history.page';

const routes: Routes = [
  {
    path: '',
    component: ProductionHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionHistoryPageRoutingModule {}
