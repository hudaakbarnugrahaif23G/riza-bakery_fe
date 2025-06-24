import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputPage } from './input.page';

const routes: Routes = [
  {
    path: '',
    component: InputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputPageRoutingModule {}
