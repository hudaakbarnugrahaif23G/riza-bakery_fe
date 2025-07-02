import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QualityEntryPage } from './quality-entry.page';

const routes: Routes = [
  {
    path: '',
    component: QualityEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QualityEntryPageRoutingModule {}
