import { CustomMaterialModule } from './../../custom-material/custom-material.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CreditCardContainerComponent } from './container/credit-card-container.component';
import { CreditCardComponent } from './components/credit-card.component';
import { BsDropdownModule } from 'ngx-bootstrap';

const routes: Routes = [
  { path: '', component: CreditCardContainerComponent }
];

@NgModule({
  declarations: [CreditCardComponent, CreditCardContainerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CustomMaterialModule,
    BsDropdownModule.forRoot()
  ]
})
export class CreditCardModule { }
