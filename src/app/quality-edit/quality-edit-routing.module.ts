import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QualityEditPage } from './quality-edit.page';

const routes: Routes = [
  {
    path: '',
    component: QualityEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QualityEditPageRoutingModule {}
