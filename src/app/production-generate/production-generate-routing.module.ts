import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionGeneratePage } from './production-generate.page';

const routes: Routes = [
  {
    path: '',
    component: ProductionGeneratePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionGeneratePageRoutingModule {}
