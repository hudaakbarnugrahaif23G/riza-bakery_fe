import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InputGudangPageRoutingModule } from './input-gudang-routing.module';

import { InputGudangPage } from './input-gudang.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputGudangPageRoutingModule
  ],
  declarations: [InputGudangPage]
})
export class InputGudangPageModule {}
