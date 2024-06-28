import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChambrePageRoutingModule } from './chambre-routing.module';

import { ChambrePage } from './chambre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChambrePageRoutingModule
  ],
  declarations: [ChambrePage]
})
export class ChambrePageModule {}
