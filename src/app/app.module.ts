import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectComponent } from './components/project/project.component';
import { SkillsComponent } from './components/skills/skills.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { EducationService } from './services/education.service';
import { HeaderService } from './services/header.service';
import { ExperienceService } from './services/experience.service';
import { SkillsService } from './services/skills.service';
import { ProjectService } from './services/project.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { HttpRequestInterceptor } from './services/http-request.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    EducationComponent,
    ExperienceComponent,
    ProjectComponent,
    SkillsComponent,
    PortfolioComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    NgCircleProgressModule.forRoot({}),
    BrowserAnimationsModule,
  ],
  providers: [
    EducationService,
    HeaderService,
    ExperienceService,
    SkillsService,
    ProjectService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
