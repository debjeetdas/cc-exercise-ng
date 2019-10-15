import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { SharedService } from 'src/app/shared/services/shared.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(
    private http: HttpClient, private ss: SharedService
  ) { }
  getHeaders() {
    const token = '';
    let headers = new HttpHeaders();
    headers = headers.set(
      'Authorization',
      token
    );
    return headers;
  }
  put(url: string, params, isAuthenticated: boolean) {
    if (isAuthenticated) {
      return this.http.patch(url, params, { headers: this.getHeaders() })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            return this.handleError(error);
          })
        );
    } else {
      return this.http.patch(url, params)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            return this.handleError(error);
          })
        );
    }
  }
  post(url: string, params, isAuthenticated: boolean) {
    if (isAuthenticated) {
      return this.http.post(url, params, { headers: this.getHeaders() })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            return this.handleError(error);
          })
        );
    } else {
      return this.http.post(url, params)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            return this.handleError(error);
          })
        );
    }
  }
  get(
    url: string,
    isAuthenticated: boolean,
    params?: HttpParams | { [param: string]: string | string[] }
  ) {
    if (params && isAuthenticated) {
      return this.http.get(url, {
        headers: this.getHeaders(),
        params
      })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            return this.handleError(error);
          })
        );
    } else if (isAuthenticated) {
      return this.http.get(url, {
        headers: this.getHeaders()
      })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            return this.handleError(error);
          })
        );
    } else {
      return this.http.get(url)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            return this.handleError(error);
          })
        );
    }
  }
  delete(
    url: string,
    isAuthenticated: boolean,
    params?: HttpParams | { [param: string]: string | string[] }
  ) {
    if (params && isAuthenticated) {
      return this.http.delete(url, {
        headers: this.getHeaders(),
        params
      })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            return this.handleError(error);
          })
        );
    } else if (isAuthenticated) {
      return this.http.delete(url, {
        headers: this.getHeaders()
      })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            return this.handleError(error);
          })
        );
    } else {
      return this.http.delete(url)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            return this.handleError(error);
          })
        );
    }
  }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
      // this.ss.openSnackBar(error.error.message, 'OK', 5000);
    }
    if (error.error) {
      return throwError(error.error);
    } else {
      return null;
    }
    // return an observable with a user-facing error message
  }
}
