import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InputQcPageRoutingModule } from './input-qc-routing.module';

import { InputQcPage } from './input-qc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputQcPageRoutingModule
  ],
  declarations: [InputQcPage]
})
export class InputQcPageModule {}
