import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QualityEditPageRoutingModule } from './quality-edit-routing.module';

import { QualityEditPage } from './quality-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QualityEditPageRoutingModule
  ],
  declarations: [QualityEditPage]
})
export class QualityEditPageModule {}
