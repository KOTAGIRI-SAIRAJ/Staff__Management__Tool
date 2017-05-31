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
  AddStaffForm : FormGroup;
  allProjectDetails:Array<any>=[];
  allStaffDetails:Array<any>=[];
  projectsDataForTagInput:Array<any>=[];
  public router: Router;
  @ViewChild('AddProject') public AddProject:ModalDirective;
  @ViewChild('AddStaff') public AddStaff:ModalDirective;
  constructor(private fb: FormBuilder,public route: Router) {
    this.router = route;
    this.AddProjectForm = this.fb.group({
      'projectName' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'projectDescription' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'projectStartDate' : ['', Validators.required,],
      'projectEndDate' : ['', Validators.required],
      'projectStatus' : ['', Validators.required]
    });
    this.AddStaffForm = this.fb.group({
      'firstName' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'lastName' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'staffRole' : ['', Validators.required,],
      'staffStatus' : ['', Validators.required],
      'projectsAssigned' : [this.projectsDataForTagInput]
    });
  }

  ngOnInit() {
    if(localStorage.hasOwnProperty('allProjectDetails')){
     this.allProjectDetails = JSON.parse(localStorage.getItem('allProjectDetails'));}
    if(localStorage.hasOwnProperty('allStaffDetails')){
      this.allStaffDetails = JSON.parse(localStorage.getItem('allStaffDetails'));}
    if(this.allProjectDetails.length > 0){
    this.allProjectDetails.forEach((eachRecord)=>{
      this.projectsDataForTagInput.push(eachRecord.projectName);
    })}
  }



  // Adding Project Details
  AddProjectDetails(value){
    value.projectId = this.allProjectDetails.length+1;
    this.allProjectDetails.push(value);
    localStorage.setItem('allProjectDetails',JSON.stringify(this.allProjectDetails));
    this.AddProjectForm.reset();
    this.AddProject.hide();
    this.projectsDataForTagInput = [];
    let tempprojectsDataForTagInput = JSON.parse(localStorage.getItem('allProjectDetails'));
    tempprojectsDataForTagInput.forEach((eachRecord)=>{
      this.projectsDataForTagInput.push(eachRecord.projectName);
    });
    localStorage.setItem('projectsDataForTagInput',JSON.stringify(this.projectsDataForTagInput));
    this.router.navigate(['projectDetails']);
  }

  // Adding Staff Details
  AddStaffDetails(value){
    this.projectsDataForTagInput = JSON.parse(localStorage.getItem('projectsDataForTagInput'));
    let count= this.allStaffDetails.length+1;
    value.staffId = count;
    this.AddStaff.hide();
    this.allStaffDetails.push(value);
    localStorage.setItem('allStaffDetails',JSON.stringify(this.allStaffDetails));
    this.AddStaffForm.reset();
    this.router.navigate(['staffDetails']);
  }
}
