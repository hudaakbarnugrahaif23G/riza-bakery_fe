import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputQcPage } from './input-qc.page';

const routes: Routes = [
  {
    path: '',
    component: InputQcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputQcPageRoutingModule {}
