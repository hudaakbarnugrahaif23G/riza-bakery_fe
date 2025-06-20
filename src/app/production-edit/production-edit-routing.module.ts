import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionEditPage } from './production-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ProductionEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionEditPageRoutingModule {}
