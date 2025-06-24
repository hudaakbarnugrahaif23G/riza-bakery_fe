import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputGudangPage } from './input-gudang.page';

const routes: Routes = [
  {
    path: '',
    component: InputGudangPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputGudangPageRoutingModule {}
