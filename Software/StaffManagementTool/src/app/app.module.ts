import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routes } from './app.router';
import { ModalModule } from 'ngx-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { TagInputModule } from 'ng2-tag-input';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SelectModule } from 'ng2-select';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import {CommonModule} from "@angular/common";
import { StaffDetailsComponent } from './staff-details/staff-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    ProjectDetailsComponent,
    StaffDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ModalModule,
    routes,
    ModalModule.forRoot(),
    DataTableModule,
    TagInputModule,
    CommonModule,
    SelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
