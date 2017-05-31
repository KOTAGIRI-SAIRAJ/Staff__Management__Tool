import {Component, OnInit} from '@angular/core';
import {HomepageComponent} from "./homepage/homepage.component";
import {ProjectDetailsComponent} from "./project-details/project-details.component";
import {StaffDetailsComponent} from "./staff-details/staff-details.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[HomepageComponent,ProjectDetailsComponent,StaffDetailsComponent]
})
export class AppComponent implements OnInit {
  ngOnInit() {
    localStorage.clear();
  }
}
