import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { CoreComponent } from './container/core/core.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CoreComponent],
  imports: [
    CommonModule,
    CustomMaterialModule,
    RouterModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [
    CoreComponent
  ]
})
export class CoreModule { }
