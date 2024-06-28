import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarbonePage } from './carbone.page';

const routes: Routes = [
  {
    path: '',
    component: CarbonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarbonePageRoutingModule {}
