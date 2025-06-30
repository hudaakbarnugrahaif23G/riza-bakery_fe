import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductionEntryPageRoutingModule } from './production-entry-routing.module';

import { ProductionEntryPage } from './production-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductionEntryPageRoutingModule
  ],
  declarations: [ProductionEntryPage]
})
export class ProductionEntryPageModule {}
