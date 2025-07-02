import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QualityEntryPageRoutingModule } from './quality-entry-routing.module';

import { QualityEntryPage } from './quality-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QualityEntryPageRoutingModule
  ],
  declarations: [QualityEntryPage]
})
export class QualityEntryPageModule {}
