import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabRoutingModule } from './tab-routing.module';

import { TabPage } from './tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabRoutingModule
  ],
  declarations: [TabPage]
})
export class TabPageModule {}

