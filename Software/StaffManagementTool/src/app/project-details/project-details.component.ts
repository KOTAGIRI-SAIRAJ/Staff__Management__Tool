import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  allProjectDetails:Array<any> = [];
  EditForm : FormGroup;
  @ViewChild('EditPopup') public EditPopup:ModalDirective;
  @ViewChild('viewProjectDetails') public viewProjectDetails:ModalDirective;
  @ViewChild('EditProjectDetails') public EditProjectDetails:ModalDirective;
  @ViewChild('DeleteProjectDetails') public DeleteProjectDetails:ModalDirective;
  public projectName;  public projectDescription;  public projectStartDate;  public projectEndDate;
  public projectStatus; public projectId;
  constructor(private fb: FormBuilder) {
    this.EditForm = this.fb.group({
      'projectName' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'projectDescription' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'projectStartDate' : ['', Validators.required,],
      'projectEndDate' : ['', Validators.required],
      'projectStatus' : ['', Validators.required]
    });
  }

  ngOnInit() {
    this.allProjectDetails = JSON.parse(localStorage.getItem('allProjectDetails'));
  }

  ViewProjectdata(data){
    this.projectName = data.projectName;
    this.projectDescription = data.projectDescription;
    this.projectStartDate = data.projectStartDate;
    this.projectEndDate = data.projectEndDate;
    this.projectStatus = data.projectStatus;
    this.projectId = data.projectId;
    this.viewProjectDetails.show();
  }
  public hideViewProjectDetails():void {
    this.viewProjectDetails.hide();
  }
  EditProjectData(Data){
    this.projectName = Data.projectName;
    this.projectDescription = Data.projectDescription;
    this.projectStartDate = Data.projectStartDate;
    this.projectEndDate = Data.projectEndDate;
    this.projectStatus = Data.projectStatus;
    this.projectId = Data.projectId;
    this.EditForm = this.fb.group({
      'projectName' : [Data.projectName, Validators.compose([Validators.required,Validators.maxLength(20)])],
      'projectDescription' : [Data.projectDescription, Validators.compose([Validators.required,Validators.maxLength(20)])],
      'projectStartDate' : [Data.projectStartDate, Validators.required,],
      'projectEndDate' : [Data.projectEndDate, Validators.required],
      'projectStatus' : [Data.projectStatus, Validators.required]
    });
    /*this.EditProjectDetails.show();*/
    this.EditPopup.show();
  }
  public hideEditProjectDetails():void{
    this.EditProjectDetails.hide();
  }
  public getTheProjectDataFromTheForm():void{
    console.log(this.projectName);

    this.allProjectDetails.forEach((eachRecord)=>{
      if(eachRecord.projectId === this.projectId){
        console.log(this.projectName);
        eachRecord.projectName = this.projectName;
        eachRecord.projectDescription = this.projectDescription;
        eachRecord.projectStartDate = this.projectStartDate;
        eachRecord.projectEndDate = this.projectEndDate;
        eachRecord.projectStatus = this.projectStatus;
      }
    })
    console.log('after Updation');
    console.log(this.allProjectDetails);
    localStorage.setItem('allProjectDetails',JSON.stringify(this.allProjectDetails));
    this.EditProjectDetails.hide();
  }

  AddProjectDetails(value){
    console.log(value);
    this.allProjectDetails.forEach((eachRecord)=>{
      if(eachRecord.projectId === this.projectId){
        console.log(this.projectName);
        eachRecord.projectName = value.projectName;
        eachRecord.projectDescription = value.projectDescription;
        eachRecord.projectStartDate = value.projectStartDate;
        eachRecord.projectEndDate = value.projectEndDate;
        eachRecord.projectStatus = value.projectStatus;
      }
    })
    console.log(this.allProjectDetails);
    localStorage.setItem('allProjectDetails',JSON.stringify(this.allProjectDetails));
    this.EditPopup.hide();
  }


  DeleteProjectData(Data){
    this.projectId = Data.projectId;
    this.projectName = Data.projectName;
    this.DeleteProjectDetails.show();
  }
  public hideDeleteProjectDetails():void{
    this.DeleteProjectDetails.hide();
  }

  public DeleteTheRecordFormTheArray(){
    this.allProjectDetails.forEach((eachElement,index)=>{
      if(eachElement.projectId === this.projectId){
        this.allProjectDetails.splice(index, 1);
      }
    })
    localStorage.setItem('allProjectDetails',JSON.stringify(this.allProjectDetails));
    this.hideDeleteProjectDetails();
    let v = JSON.parse(localStorage.getItem('allProjectDetails'))
    console.log(v)
    /*this._StaffDataTableComponent.UpdatethestaffIfProjectIsDeleted(this.counter,this.projectname);*/
  }
}
