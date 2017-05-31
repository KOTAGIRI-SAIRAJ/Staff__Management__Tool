import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public router: Router;
  public allStaffDetails;
  public allProjectDetails;
  constructor(public route: Router) {
    this.router = route;
  }

  ngOnInit() {
    this.allProjectDetails = JSON.parse(localStorage.getItem('allProjectDetails'));
    this.allStaffDetails = JSON.parse(localStorage.getItem('allStaffDetails'));
  }


}
