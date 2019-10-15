import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardModalComponent } from './components/card-modal/card-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ProperCasePipe } from './pipes/proper-case.pipe';


@NgModule({
  declarations: [
  CardModalComponent,
  ConfirmModalComponent,
  ProperCasePipe],
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ProperCasePipe
  ],
  entryComponents: [
    CardModalComponent,
    ConfirmModalComponent
  ]
})
export class SharedModule { }
