import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtelierDetailPageRoutingModule } from './atelier-detail-routing.module';

import { AtelierDetailPage } from './atelier-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtelierDetailPageRoutingModule
  ],
  declarations: [AtelierDetailPage]
})
export class AtelierDetailPageModule {}
