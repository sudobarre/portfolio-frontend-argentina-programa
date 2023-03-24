import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getProject(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiServerUrl}/api/v1/project/all`);
  }
  public addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiServerUrl}/api/v1/project`, project);
  }
  public updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiServerUrl}/api/v1/project`, project);
  }
  public deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/api/v1/project/${projectId}`
    );
  }
}
