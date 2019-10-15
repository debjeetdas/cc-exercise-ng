import { Injectable } from '@angular/core';

import { RestApiService } from './../../../core/services/rest-api.service';
import { SharedService } from './../../../shared/services/shared.service';
import { restApiConstants } from 'src/app/constants/rest-api.constants';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  private BASE_URL: string;

  constructor(
    private ss: SharedService,
    private restApiService: RestApiService
  ) {
    this.BASE_URL = this.ss.getBaseUrl();
  }

  getCards() {
    return this.restApiService.get(
        this.BASE_URL, true);
  }

  saveCard(card: Card) {
    return this.restApiService.post(
        this.BASE_URL, card, true);
  }

  updateCard(card: Card, id: number) {
    return this.restApiService.put(
        this.BASE_URL + restApiConstants.UPDATE_DELETE_CARD.replace('{id}', id.toString()), card, true);
  }

  deleteCard(id: number) {
    return this.restApiService.delete(
        this.BASE_URL + restApiConstants.UPDATE_DELETE_CARD.replace('{id}', id.toString()), true);
  }
}
