import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterSimplePageRoutingModule } from './register-simple-routing.module';

import { RegisterSimplePage } from './register-simple.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RegisterSimplePageRoutingModule
  ],
  declarations: [RegisterSimplePage]
})
export class RegisterSimplePageModule {}
