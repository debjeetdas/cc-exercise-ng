import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private showSpinnerSubject$: BehaviorSubject<boolean>;
  showSpinner$: Observable<boolean>;
  private BASE_URL: string;

  constructor(private snackBar: MatSnackBar) {
    this.BASE_URL = environment.BASEURL;
    this.showSpinnerSubject$ = new BehaviorSubject(false);
    this.showSpinner$ = new Observable();
    this.showSpinnerSubject$.subscribe(
      (value) => {
        this.showSpinner$ = this.showSpinnerSubject$.asObservable();
      }
    );
  }
  showLoading(isShow: boolean) {
    this.showSpinnerSubject$.next(isShow);
  }
  getBaseUrl() {
    return this.BASE_URL;
  }
  openSnackBar(message: string, action: string, dur: any = 2000, pos: any = 'top') {
    this.snackBar.open(message, action, {
      duration: dur,
      verticalPosition: pos
    });
  }
}
