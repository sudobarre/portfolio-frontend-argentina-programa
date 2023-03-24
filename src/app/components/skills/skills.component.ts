import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Skill } from 'src/app/models/skill';
import { SkillsService } from 'src/app/services/skills.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {

  public skills: Skill[] = [];
  public editSkill: Skill | undefined;
  public deleteSkill: Skill | undefined;

  isLoggedIn: boolean = false;

  constructor(
    private skillsService: SkillsService,
    public storageService: StorageService
    ) {}
  
  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.getSkill();
  }

  public getSkill(): void {
    this.skillsService.getSkill().subscribe({
      next: (response: Skill[]) => {
        this.skills = response;
        
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
      },
    });
  }
  public onOpenModal(mode: string, skill?: Skill): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addSkillModal');
    } else if (mode === 'delete') {
      this.deleteSkill = skill;
      button.setAttribute('data-target', '#deleteSkillModal');
    } else if (mode === 'edit') {
      this.editSkill = skill;
      button.setAttribute('data-target', '#editSkillModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddSkill(addForm: NgForm): void {
    document.getElementById('add-skill-form')?.click();
    
    
    this.skillsService.addSkill(addForm.value).subscribe({
      next: (response: Skill) => {
        
        this.getSkill();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
    });
  }

  public onUpdateSkill(skill: Skill): void { 
    this.editSkill = skill;
    this.skillsService.updateSkill(skill).subscribe({
      next: (response: Skill) => {
        this.getSkill();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onDeleteSkill(id: number): void {
    this.skillsService.deleteSkill(id).subscribe({
      next: (response: void) => {
        this.getSkill();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
  onDrop(event: CdkDragDrop<Skill[]>) {
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
