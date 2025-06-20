import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductionEditPageRoutingModule } from './production-edit-routing.module';

import { ProductionEditPage } from './production-edit.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductionEditPageRoutingModule, ReactiveFormsModule
  ],
  declarations: [ProductionEditPage]
})
export class ProductionEditPageModule {}
