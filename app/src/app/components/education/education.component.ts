import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/services/education.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { throwError } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  public educations: Education[] = [];
  //public educations2 = this.educationService.getEducation();
  public editEducation: Education | undefined;
  public deleteEducation: Education | undefined;

  isLoggedIn: boolean = false;

  constructor(
    private educationService: EducationService,
    public storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getEducation();
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  public getEducation(): void {
    this.educationService.getEducation().subscribe({
      next: (response: Education[]) => {
        this.educations = response;
      },
      error: (error: HttpErrorResponse) => {
        throwError(error);
      },
    });
  }
  public onOpenModal(mode: string, education?: Education): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEducationModal');
    } else if (mode === 'delete') {
      this.deleteEducation = education;
      button.setAttribute('data-target', '#deleteEducationModal');
    } else if (mode === 'edit') {
      this.editEducation = education;
      button.setAttribute('data-target', '#editEducationModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddEducation(addForm: NgForm): void {
    document.getElementById('add-education-form')?.click();
    this.educationService.addEducation(addForm.value).subscribe({
      next: (response: Education) => {
        this.getEducation();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
    });
  }

  public onUpdateEducation(education: Education): void {
    this.editEducation = education;
    this.educationService.updateEducation(education).subscribe({
      next: (response: Education) => {
        this.getEducation();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onDeleteEducation(id: number): void {
    this.educationService.deleteEducation(id).subscribe({
      next: (response: void) => {
        this.getEducation();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  onDrop(event: CdkDragDrop<Education[]>) {
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
