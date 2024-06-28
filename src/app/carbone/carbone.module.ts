import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarbonePageRoutingModule } from './carbone-routing.module';

import { CarbonePage } from './carbone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarbonePageRoutingModule
  ],
  declarations: [CarbonePage]
})
export class CarbonePageModule {}
