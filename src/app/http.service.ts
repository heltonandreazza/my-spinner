import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
declare var $: any;

@Injectable()
export class HttpService extends Http {

  public pendingRequests: any = 0;
  public showLoading: any = false;

  constructor(backend: XHRBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.request(url, options));
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    console.log("In the intercept routine..");
    this.pendingRequests++;
    this.turnOnSpinner();
    return observable
      .catch(err => {
        return Observable.throw('deu treta');
      })
      .do((res: Response) => {
        console.log("Response: " + res);
        return res;
      }, (err: any) => {
        console.log("Caught error: " + err);
        return err;
      })
      .finally(() => {
        console.log("Finally.. delaying, though.")
        // var timer = Observable.timer(1000);
        // timer.subscribe(t => {
        // });
        this.turnOffSpinner();
      });
  }

  private turnOnSpinner() {
    if (this.pendingRequests > 0) {
      console.log("Turned on spinner");
      if(document.getElementById('g7-spinner'))
        document.getElementById('g7-spinner').removeAttribute('hidden');
    }
  }

  private turnOffSpinner() {
    this.pendingRequests--;
    if (this.pendingRequests <= 0) {
      if(document.getElementById('g7-spinner'))
        document.getElementById('g7-spinner').setAttribute('hidden', 'true');
    }
    console.log("Turned off spinner");
  }
}
