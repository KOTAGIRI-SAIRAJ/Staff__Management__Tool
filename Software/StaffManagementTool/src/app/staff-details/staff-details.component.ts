import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.css']
})
export class StaffDetailsComponent implements OnInit {
  @ViewChild('viewStaffDetails') public viewStaffDetails:ModalDirective;
  @ViewChild('StaffEditDetails') public StaffEditDetails:ModalDirective;
  @ViewChild('StaffEditPopup') public StaffEditPopup:ModalDirective;
  @ViewChild('DeleteStaffDetails') public DeleteProjectDetails:ModalDirective;
  StaffEditFrom : FormGroup;
  allStaffDetails:Array<any> = [];
  allStaffForAutoComplter:Array<any> =[];
  private value: any = {};
  private _disabledV = '0';
  public SelectedValue;
  private disabled = false;
  public SelectedDropDown;
  public SelectedValueFromAutoCompleter;
  public firstName;public lastName;public staffRole;public staffStatus;public projectsAssigned;
  public StaffId;
  constructor(private fb: FormBuilder) {
    this.StaffEditFrom = this.fb.group({
      'firstName' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'lastName' : ['', Validators.compose([Validators.required,Validators.maxLength(20)])],
      'staffRole' : ['', Validators.required,],
      'staffStatus' : ['', Validators.required],
      'projectsAssigned' : ['', Validators.required]
    });
  }

  ngOnInit() {
    this.allStaffDetails = JSON.parse(localStorage.getItem('allStaffDetails'));
    let temp = JSON.parse(localStorage.getItem('allProjectDetails'));
    if(temp.length === 0){
      this.allStaffDetails = [];
      localStorage.setItem('allStaffDetails',JSON.stringify(this.allStaffDetails));
    }
    if(this.allStaffDetails.length>0) {
      this.allStaffDetails.forEach((eachRecord) => {
        this.allStaffForAutoComplter.push(eachRecord.firstName + ' ' + eachRecord.lastName);
      })
    }
  }



  ViewStaffdata = (Data):void =>{
    this.firstName = Data.firstName;
    this.lastName = Data.lastName;
    this.staffRole = Data.staffRole;
    this.staffStatus = Data.staffStatus;
    this.projectsAssigned = Data.projectsAssigned;
    this.StaffId = Data.staffId;
    this.viewStaffDetails.show();
  };
  hideViewStaffDetails = ():void =>{
    this.viewStaffDetails.hide();
  };

  EditStaffData = (Data):void =>{
    this.firstName = Data.firstName;
    this.lastName = Data.lastName;
    this.staffRole = Data.staffRole;
    this.staffStatus = Data.staffStatus;
    this.projectsAssigned = Data.projectsAssigned;
    this.StaffId = Data.staffId;
    this.StaffEditFrom = this.fb.group({
      'firstName' : [Data.firstName, Validators.compose([Validators.required,Validators.maxLength(20)])],
      'lastName' : [Data.lastName, Validators.compose([Validators.required,Validators.maxLength(20)])],
      'staffRole' : [Data.staffRole, Validators.required,],
      'staffStatus' : [Data.staffStatus, Validators.required],
      'projectsAssigned' : [Data.projectsAssigned, Validators.required]
    });
    this.StaffEditPopup.show()
  };
  AddStaffDetails = (value):void =>{
    this.allStaffDetails.forEach((eachRecord)=>{
      if(eachRecord.staffId === this.StaffId){
        eachRecord.firstName = value.firstName;
        eachRecord.lastName = value.lastName;
        eachRecord.staffRole = value.staffRole;
        eachRecord.staffStatus = value.staffStatus;
        eachRecord.projectsAssigned = value.projectsAssigned;
      }
    });
    localStorage.setItem('allStaffDetails',JSON.stringify(this.allStaffDetails));
    this.StaffEditPopup.hide();
  };

  DeleteStaffData = (Data):void =>{
    this.firstName = Data.firstName;
    this.StaffId = Data.staffId;
    this.DeleteProjectDetails.show();
  };
  public hideDeleteProjectDetails = ():void =>{
    this.DeleteProjectDetails.hide();
  };
  DeleteTheRecordFormTheArray = ():void =>{
    this.allStaffDetails = JSON.parse(localStorage.getItem('allStaffDetails'));
    this.allStaffDetails.forEach((eachElement,index)=>{
      if(eachElement.staffId === this.StaffId && eachElement.firstName === this.firstName){
        this.allStaffDetails.splice(index, 1);
      }
    });
    this.allStaffForAutoComplter = [];
    this.allStaffDetails.forEach((eachRecord)=>{
      this.allStaffForAutoComplter.push(eachRecord.firstName + ' ' + eachRecord.lastName);
    });
    localStorage.setItem('allStaffDetails',JSON.stringify(this.allStaffDetails));
    this.hideDeleteProjectDetails();
  };



  UpdatethestaffIfProjectIsDeleted = (Counter,ProjectName):void =>{
    let name="";
    this.allStaffDetails = [];
    let temp = JSON.parse(localStorage.getItem('allStaffDetails'));
    temp.forEach((eachRecord,index)=>{
      eachRecord.projectsAssigned.forEach((eachProject,index1)=>{
        if(eachProject  === ProjectName){
          eachRecord.projectsAssigned.splice(index1,1);
          console.log('from the temp else if');
          console.log(temp);
          name = eachRecord.lastName;
        }
      })
    });
    temp.forEach((eachRecord)=>{
      if(eachRecord.projectsAssigned.length > 0){
        this.allStaffDetails.push(eachRecord);
      }
    });
    console.log(this.allStaffDetails);
    localStorage.setItem('allStaffDetails',JSON.stringify(this.allStaffDetails));
    this.allStaffDetails = JSON.parse(localStorage.getItem('allStaffDetails'))
  };


  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  // Get The Selected Product and returns the Product Id using Event Emitter
  public selected(value: any): void {
    let SplittedValue = value.id.split(' ');
    this.SelectedValue={
      firstName:SplittedValue[0],
      lastName:SplittedValue[1]
    }
    this.SelectedValueFromAutoCompleter = this.SelectedValue;
    this.UpdateDataTable();
  }

  public removed(value: any): void {
    /*console.log('Removed value is: ', value);*/
  }

  public typed(value: any): void {
    /*console.log('from Typed '+value)*/
  }

  public refreshValue(value: any): void {
    this.value = value;
  }

  UpdateDataTable = ():void =>{
    let temp = JSON.parse(localStorage.getItem('allStaffDetails'));
    this.allStaffDetails = []
    temp.forEach((eachRecord)=>{
      if(eachRecord.firstName === this.SelectedValue.firstName && eachRecord.lastName === this.SelectedValue.lastName){
        this.allStaffDetails.push(eachRecord);
      }
    })
  }


  OnclickSearchBar = (val):void =>{
    let tempForallStaffDetails = JSON.parse(localStorage.getItem('allStaffDetails'));
    if(!this.SelectedDropDown){
      alert('Not Selected Any Type')
    }else{
      if(!this.SelectedValue){
        alert('Not Selected Any Autocompleter')
      }else {
        let temp = this.SelectedDropDown;
        this.allStaffDetails = [];
        tempForallStaffDetails.forEach((eachRecord)=>{
          if(eachRecord.firstName === this.SelectedValue.firstName && eachRecord.lastName === this.SelectedValue.lastName && eachRecord.staffStatus === temp){
              this.allStaffDetails.push(eachRecord);
          }
        })
      }
    }
    /*this.allStaffDetails = JSON.parse(localStorage.getItem('allStaffDetails'));*/
  }

  UpdatetheTableIfValueisEdited = (oldName,newName):void =>{
    let tempForallStaffDetails = JSON.parse(localStorage.getItem('allStaffDetails'));
    tempForallStaffDetails.forEach((eachRecord)=>{
      eachRecord.projectsAssigned.forEach((eachItem,index)=>{
        if(eachItem === oldName){
          eachRecord.projectsAssigned[index] = newName;
        }
      })
    })
    this.allStaffDetails = tempForallStaffDetails;
    localStorage.setItem('allStaffDetails',JSON.stringify(this.allStaffDetails));
  }
}
