import { Component } from '@angular/core';
import {HomepageComponent} from "./homepage/homepage.component";
import {ProjectDetailsComponent} from "./project-details/project-details.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[HomepageComponent,ProjectDetailsComponent]
})
export class AppComponent {
  title = 'app works!';
}
