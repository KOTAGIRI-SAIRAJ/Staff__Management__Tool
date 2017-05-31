/**
 * Created by semanticbit on 30/5/17.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {ProjectDetailsComponent} from "./project-details/project-details.component";
import {StaffDetailsComponent} from "./staff-details/staff-details.component";

export const router:  Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component : HomepageComponent},
  {path: 'projectDetails',component:ProjectDetailsComponent},
  {path: 'staffDetails', component:StaffDetailsComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);

