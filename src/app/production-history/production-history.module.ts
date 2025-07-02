import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductionHistoryPageRoutingModule } from './production-history-routing.module';

import { ProductionHistoryPage } from './production-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductionHistoryPageRoutingModule
  ],
  declarations: [ProductionHistoryPage]
})
export class ProductionHistoryPageModule {}
