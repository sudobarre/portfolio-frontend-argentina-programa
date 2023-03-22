import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Info } from 'src/app/models/info';
import { HeaderService } from 'src/app/services/header.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public info: Info | undefined;
  public editInfo: Info | undefined;

  isLoggedIn: boolean = false;

  constructor(
    private headerService: HeaderService,
    public storageService: StorageService
  ) {}

  ngOnInit() {
    this.getInfo();
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  public getInfo(): void {
    this.headerService.getInfo(1).subscribe({
      next: (response: Info) => {
        this.info = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
      },
    });
  }

  public onOpenModal(mode: string, info?: Info): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    button.setAttribute('data-target', '#editInfoModal');

    container?.appendChild(button);
    button.click();
  }
  public onUpdateInfo(info: Info): void {
    this.editInfo = info;
    this.headerService.updateInfo(info).subscribe({
      next: (response: Info) => {
        console.log(response);
        this.getInfo();
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
      },
    });
  }
}
