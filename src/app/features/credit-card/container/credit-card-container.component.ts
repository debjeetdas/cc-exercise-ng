import { Component, OnInit } from '@angular/core';
import { CreditCardService } from '../services/credit-card.service';
import { Card } from '../models/card';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CardModalComponent } from 'src/app/shared/components/card-modal/card-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { SharedService } from 'src/app/shared/services/shared.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-credit-card-container',
  templateUrl: './credit-card-container.component.html',
  styleUrls: ['./credit-card-container.component.scss']
})

export class CreditCardContainerComponent implements OnInit {
  // @HostBinding('class') wrapperClass = 'flex-auto component-padding container background-color';
  totalCards: Card[];
  cards: Card[];
  totalItem: number;
  cardPageConfig = { length: 3, pageSize: 10, pageIndex: 0, pageSizeOptions: [5, 10, 25, 100] };
  bsModalRef: BsModalRef;
  selectedCard: Card = new Card();

  constructor(
    private creditCardService: CreditCardService,
    private modalService: BsModalService,
    private ss: SharedService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getCards();
  }

  getCards() {
    this.creditCardService.getCards()
      .subscribe((response: any) => {
        this.totalCards = _.orderBy(response.data, ['modifiedDate'], ['desc']);
        this.totalItem = response.data.length;
        this.cardPageConfig.pageIndex = 0;
        const event = {
          pageSize: this.cardPageConfig.pageSize,
          pageIndex: this.cardPageConfig.pageIndex
        };
        this.pageEvent(event);
      });
  }

  pageEvent(event: any) {
    const totalItems = this.totalCards;
    this.cards = totalItems.slice(event.pageIndex * event.pageSize, (event.pageIndex + 1) * event.pageSize);
    this.cardPageConfig.pageSize = event.pageSize;
    this.cardPageConfig.pageIndex = event.pageIndex;
  }

  addCard() {
    this.selectedCard = new Card();
    this.openCardModal();
  }

  editCard(card: Card) {
    this.selectedCard = card;
    this.openCardModal();
  }
  deleteCard(id: number) {
    this.selectedCard.id = id;
    this.openDialog();
  }

  openCardModal() {
    const initialState = {
      card: {
        name: this.selectedCard.name,
        ccnumber: this.selectedCard.ccnumber,
        limit: this.selectedCard.limit,
        balance: this.selectedCard.balance
      },
      title: 'Add Card',
    };
    if (this.selectedCard.id) {
      const val = 'id';
      initialState.card[val] = this.selectedCard.id;
      initialState.title = 'Edit Card';
    }
    this.bsModalRef = this.modalService.show(CardModalComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.primaryBtnName = (this.selectedCard.id) ? 'Update Card' : 'Create Card';
    this.bsModalRef.content.onClose.subscribe((result: boolean) => {
      if (result) {
        this.getCards();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '350px',
      data: { name: this.selectedCard.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.creditCardService.deleteCard(this.selectedCard.id)
          .subscribe((response: any) => {
            this.ss.openSnackBar(response.message, 'OK');
            this.getCards();
          }, error => {
            this.ss.openSnackBar(error.message, 'OK');
          });
      }
    });
  }
}
