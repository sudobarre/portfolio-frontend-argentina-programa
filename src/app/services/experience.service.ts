import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experience } from '../models/experience';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiServerUrl}/api/v1/experience/all`);
  }
  public addExperience(education: Experience): Observable<Experience> {
    return this.http.post<Experience>(
      `${this.apiServerUrl}/api/v1/experience`,
      education
    );
  }
  public updateExperience(education: Experience): Observable<Experience> {
    return this.http.put<Experience>(
      `${this.apiServerUrl}/api/v1/experience`,
      education
    );
  }
  public deleteExperience(experienceId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/api/v1/experience/${experienceId}`
    );
  }
}
