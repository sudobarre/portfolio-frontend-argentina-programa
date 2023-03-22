import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  public projects: Project[] = [];
  public editProject: Project | undefined;
  public deleteProject: Project | undefined;
  isLoggedIn: boolean = false;

  constructor(
    private projectService: ProjectService,
    public storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.getProject();
  }

  public getProject(): void {
    this.projectService.getProject().subscribe({
      next: (response: Project[]) => {
        this.projects = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
      },
    });
  }
  public onOpenModal(mode: string, project?: Project): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProjectModal');
    } else if (mode === 'delete') {
      this.deleteProject = project;
      button.setAttribute('data-target', '#deleteProjectModal');
    } else if (mode === 'edit') {
      this.editProject = project;
      button.setAttribute('data-target', '#editProjectModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddProject(addForm: NgForm): void {
    document.getElementById('add-project-form')?.click();
    this.projectService.addProject(addForm.value).subscribe({
      next: (response: Project) => {
        console.log(response);
        this.getProject();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
    });
  }

  public onUpdateProject(project: Project): void {
    this.editProject = project;
    this.projectService.updateProject(project).subscribe({
      next: (response: Project) => {
        console.log(response);
        this.getProject();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onDeleteProject(id: number): void {
    this.projectService.deleteProject(id).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getProject();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  onDrop(event: CdkDragDrop<Project[]>) {
    if (this.isLoggedIn) {
      if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }
  }
}
