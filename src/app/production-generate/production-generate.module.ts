import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductionGeneratePageRoutingModule } from './production-generate-routing.module';

import { ProductionGeneratePage } from './production-generate.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductionGeneratePageRoutingModule, ReactiveFormsModule
  ],
  declarations: [ProductionGeneratePage]
})
export class ProductionGeneratePageModule {}
