import {  AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(
    public dialog: MatDialog,
    private userservice: UserService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['userid', 'username', 'gender', 'dob', 'age', 'address', 'country', 'actions'];
  dataitems: any[] = [];
  dataSource = new MatTableDataSource<any>(this.dataitems);
 
  getuserData() {
    this.userservice.getData().subscribe((res: any) => {
      this.dataitems = res;
      this.dataSource.data = this.dataitems;
    })
  }

  adduser() {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      height: '90vh',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      let data = JSON.parse(result)
      if (data) {
        this.getuserData();
        this._snackBar.open('User Added','Ok', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 1500
        });
      }
    });
  }

  edit(row: any) {
    // console.log("edit", row);
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      data: { mode: 'edit', row },
      height: '90vh',
      width: '700px',
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getuserData();
        this._snackBar.open('User Updated','Ok', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 1500
        });
      }
    });
  }


  delete(data: any) {
    let confirmation = confirm("Are you sure want to Delete ?")
    if (confirmation) {
      this.userservice.deleteData(data).subscribe(() => this.getuserData())
      this._snackBar.open('User Deleted','Ok', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 1500
      });
    }
  }


}
 

