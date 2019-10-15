import { NUMBER_REGEX, NAME_REGEX } from './../../../constants/regex.constants';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Card } from 'src/app/features/credit-card/models/card';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/utils/error-state-matcher';
import { validateForm } from 'src/app/utils/helper';
import { Subject } from 'rxjs';
import { CreditCardService } from 'src/app/features/credit-card/services/credit-card.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit, OnDestroy {
  public onClose: Subject<boolean>;
  title: string;
  closeBtnName: string;
  primaryBtnName: string;
  card: Card;
  cardForm: FormGroup;
  matcher: MyErrorStateMatcher;
  nameRegexPattern = new RegExp(NAME_REGEX);
  numberRegexPattern = new RegExp(NUMBER_REGEX);
  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private creditCardService: CreditCardService,
    private ss: SharedService
  ) {
    this.matcher = new MyErrorStateMatcher();
    this.onClose = new Subject();
  }

  ngOnInit() {
    this.cardForm = this.formBuilder.group({
      name: [this.card.name, {
        validators: [
          Validators.required,
          Validators.pattern(this.nameRegexPattern)
        ]
      }],
      ccnumber: [{value: this.card.ccnumber, disabled: (this.card.id)}, {
        validators: [
          Validators.required,
          Validators.pattern(this.numberRegexPattern)
        ]
      }],
      limit: [this.card.limit, {
        validators: [
          Validators.required,
          Validators.pattern(this.numberRegexPattern)
        ]
      }],
      balance: [{value: this.card.balance, disabled: !(this.card.id)}, {
        validators: [
          Validators.pattern(this.numberRegexPattern)
        ]
      }]
    });
  }

  createOrUpdateCard() {
    validateForm(this.cardForm);
    if (this.cardForm.valid) {
      this.card.name = this.cardForm.value.name;
      this.card.ccnumber = (this.cardForm.value.ccnumber) ? this.cardForm.value.ccnumber : this.card.ccnumber;
      this.card.limit = this.cardForm.value.limit;
      this.card.balance = this.cardForm.value.balance;
      if (this.card.id) {
        this.creditCardService.updateCard(this.card, this.card.id)
          .subscribe((response: any) => {
            this.bsModalRef.hide();
            this.ss.openSnackBar(response.message, 'OK');
            this.onClose.next(true);
          }, error => {
            this.ss.openSnackBar(error.message, 'OK', 3000);
          });
      } else {
        this.creditCardService.saveCard(this.card)
          .subscribe((cardResponse: any) => {
            this.bsModalRef.hide();
            this.ss.openSnackBar(cardResponse.message, 'OK');
            this.onClose.next(true);
          }, error => {
            this.ss.openSnackBar(error.message, 'OK', 3000);
          });
      }
    }
  }

  ngOnDestroy() {
    this.onClose.next(false);
  }

}
