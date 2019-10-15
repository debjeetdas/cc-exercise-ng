import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Card } from '../models/card';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {
  @Input() cards: Card[];
  @Input() cardPageConfig: any;
  @Input() totalItem: number;
  cardColumns = ['name', 'ccnumber', 'limit', 'balance', 'star'];
  @Input() pageSize: number;
  @Input() pageSizeOptions: number[];
  @Output() cardPageConfig$: EventEmitter<any>;
  @Output() editCard$: EventEmitter<any>;
  @Output() deleteCard$: EventEmitter<any>;
  @Output() triggerBuild$: EventEmitter<any>;
  @Output() addCard$: EventEmitter<any>;
  @Output() getCards$: EventEmitter<any>;
  constructor(
    private router: Router
  ) {
    this.cardPageConfig$ = new EventEmitter();
    this.editCard$ = new EventEmitter();
    this.deleteCard$ = new EventEmitter();
    this.addCard$ = new EventEmitter();
    this.getCards$ = new EventEmitter();
    this.triggerBuild$ = new EventEmitter();
  }

  ngOnInit() {
    // this.getCards$.emit();
  }

  pageEvent(event: any) {
    this.cardPageConfig$.emit(event);
  }
  addCard() {
    this.addCard$.emit();
  }
  editCard(card: Card) {
    this.editCard$.emit(card);
  }
  deleteCard(id: number) {
    this.deleteCard$.emit(id);
  }
}
