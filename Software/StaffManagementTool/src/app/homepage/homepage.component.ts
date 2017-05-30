import {Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ModalDirective} from "ngx-bootstrap/modal";
import {Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers:[FormBuilder]
})
export class HomepageComponent implements OnInit {
  AddProjectForm : FormGroup;
  allProjectDetails:Array<any>=[];
  public router: Router;
  @ViewChild('AddProject') public AddProject:ModalDirective;
  constructor(private fb: FormBuilder,public route: Router) {
    this.router = route;
    this.AddProjectForm = this.fb.group({
      'projectName' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'projectDescription' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'projectStartDate' : ['', Validators.required,],
      'projectEndDate' : ['', Validators.required],
      'projectStatus' : ['', Validators.required]
    });
  }

  ngOnInit() {
    if(localStorage.hasOwnProperty('allProjectDetails')){
     this.allProjectDetails = JSON.parse(localStorage.getItem('allProjectDetails'));}
  }
  AddProjectDetails(value){
    console.log(value);
    value.projectId = this.allProjectDetails.length+1;
    this.allProjectDetails.push(value);
    localStorage.setItem('allProjectDetails',JSON.stringify(this.allProjectDetails));
    this.AddProjectForm.reset();
    this.AddProject.hide()
    this.router.navigate(['projectDetails']);
  }

}
