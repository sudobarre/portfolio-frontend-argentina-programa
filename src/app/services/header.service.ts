import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Info } from '../models/info';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  //No hay delete porque es el usuario en si mismo

  public createInfo(info: Info): Observable<Info>{
    return this.http.post<Info>(`${this.apiServerUrl}/api/v1/info`, info)
  }

  public getInfo(username: string): Observable<Info> {
    return this.http.get<Info>(`${this.apiServerUrl}/api/v1/info/${username}`);
  }
  public updateInfo(info: Info): Observable<Info> {
    return this.http.put<Info>(`${this.apiServerUrl}/api/v1/info`, info);
  }
}
