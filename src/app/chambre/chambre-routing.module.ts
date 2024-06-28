import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChambrePage } from './chambre.page';

const routes: Routes = [
  {
    path: '',
    component: ChambrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChambrePageRoutingModule {}
