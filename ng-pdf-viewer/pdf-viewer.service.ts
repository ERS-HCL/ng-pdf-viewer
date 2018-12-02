import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PdfViewerService {

  constructor(private _httpClient: HttpClient) { }

  public getPdf(apiUrl: string, withCredentials: boolean, body?: any): Observable<any> {
    return this._httpClient.get(apiUrl, {headers:  new HttpHeaders({ 'Content-Type': 'application/pdf' }), withCredentials: withCredentials, responseType: 'blob'}).pipe(catchError(this.handleError));
  }

  public postPdf(apiUrl: string, withCredentials, postBody: any): Observable<any> {
    return this._httpClient.post(apiUrl, postBody, {headers:  new HttpHeaders({ 'Content-Type': 'application/pdf' }), withCredentials: withCredentials}).pipe(catchError(this.handleError));
  }

  public putPdf(apiUrl: string, withCredentials, postBody: any): Observable<any> {
    return this._httpClient.put(apiUrl, postBody, {headers:  new HttpHeaders({ 'Content-Type': 'application/pdf' }), withCredentials: withCredentials}).pipe(catchError(this.handleError));
  }

  public handleError(err: HttpErrorResponse) {
      let errMsg = '';
      if (err.error instanceof Error) {
        errMsg = err.error.message;
      } else {
        errMsg = err.error;
      }
      return throwError(errMsg);
  }
}