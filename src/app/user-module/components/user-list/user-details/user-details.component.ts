import { Component, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/user-module/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userForm: any;
  countries = ['USA', 'Canada', 'UK', 'Australia', 'India', 'Dubai'];
  tomorrow = new Date();
  title: string = "Add";
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userservice: UserService
  ) {
    this.tomorrow.setDate(this.tomorrow.getDate());
  }


  ngOnInit() {
    this.userForm = this.fb.group({
      userid: ['', Validators.required],
      username: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      age: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      address: ['', Validators.required],
      country: ['', Validators.required]
    });

    this.userForm.get('dob').valueChanges.subscribe((value: any) => {
      this.calculateAge(value);
    });

    this.edit(this.data);
  }

  calculateAge(dob: Date) {
    if (dob) {
      const timeDiff = Math.abs(Date.now() - new Date(dob).getTime());
      const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
      this.userForm.get('age').setValue(age);
    }
  }

  onSave() {
    if (this.userForm.valid) {
      if (this.isEditMode) {
        this.userservice.editData(this.userForm.value)
        this.dialogRef.close(JSON.stringify(this.userForm.value));
      } 
      else {
        this.userservice.saveData(this.userForm.value);
        this.dialogRef.close(JSON.stringify(this.userForm.value));
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  clear() {
    this.userForm.reset();
  }

  edit(selectedRow: any) {
    if (selectedRow && selectedRow.mode == 'edit') {
      this.isEditMode = true;
      this.userForm.patchValue({
        userid: selectedRow.row.userid,
        username: selectedRow.row.username,
        gender: selectedRow.row.gender,
        dob: selectedRow.row.dob,
        age: selectedRow.row.age,
        address: selectedRow.row.address,
        country: selectedRow.row.country
      });      
    }
  }


}