import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Skill } from '../models/skill';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getSkill(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiServerUrl}/api/v1/skill/all`);
  }
  public addSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(`${this.apiServerUrl}/api/v1/skill`, skill);
  }

  public updateSkill(skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(`${this.apiServerUrl}/api/v1/skill`, skill);
  }
  public deleteSkill(skillId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/v1/skill/${skillId}`);
  }
}
