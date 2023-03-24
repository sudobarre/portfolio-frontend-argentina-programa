import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Education } from '../models/education';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.apiServerUrl}/api/v1/education/all`);
  }
  public addEducation(education: Education): Observable<Education> {
    return this.http.post<Education>(
      `${this.apiServerUrl}/api/v1/education`,
      education
    );
  }
  public updateEducation(education: Education): Observable<Education> {
    return this.http.put<Education>(
      `${this.apiServerUrl}/api/v1/education`,
      education
    );
  }
  public deleteEducation(educationId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/api/v1/education/${educationId}`
    );
  }
}
