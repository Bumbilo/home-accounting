import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

@Injectable()
export class BaseApi {
  private baseUrl = 'http://localhost:8000/';
  private headers = new Headers();
  private options: RequestOptions;

  constructor(public http: Http) {
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    this.headers.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    console.log(this.headers)

    this.options = new RequestOptions({headers: this.headers});
  }

  private getUrl(url: string): string {
    return this.baseUrl + url;
  }

  public get(url: string = ''): Observable<any> {
    return this.http.get(this.getUrl(url))
      .map((response: Response) => response['_body'] ? response.json() : undefined);
  }

  public post(url: string = '', data: any = {}): Observable<any> {
    return this.http.post(this.getUrl(url), data)
      .map((response: Response) => response.json());
  }

  public put(url: string = '', data: any = {}): Observable<any> {
    return this.http.put(this.getUrl(url), data)
      .map((response: Response) => response.json());
  }
}
