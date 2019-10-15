import { Injectable } from '@angular/core';

import { SharedService } from 'src/app/shared/services/shared.service';


@Injectable({
  providedIn: 'root'
})
export class CoreService {
  private BASE_URL: string;

  constructor(private ss: SharedService
  ) {
    this.BASE_URL = ss.getBaseUrl();
  }
}
