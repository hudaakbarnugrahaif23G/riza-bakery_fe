import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionEntryPage } from './production-entry.page';

const routes: Routes = [
  {
    path: '',
    component: ProductionEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionEntryPageRoutingModule {}
