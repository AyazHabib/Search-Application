import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IResponse } from '../models/searchResponse';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  public baseUrl:string = environment.baseUrl;
  readonly placeHolder:string = '{1}';

  constructor(private http: HttpClient) { }

  public getRepository(param: string): Observable<IResponse> {
    return this.http.get(this.formatUrl(this.baseUrl, param.toLowerCase()))
    .pipe(map((res:IResponse) => res)) 
  }

  formatUrl(url:string, param:string): string {
    return url.replace(this.placeHolder, param);
  }

}
