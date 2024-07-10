import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface User{
  userid: string,
  username: string,
  gender: string,
  dob: Date,
  age: number,
  address: string,
  country: string
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private users: User[] = [];
  constructor() { }


  getData(): Observable<User[]> {
    // console.warn("getData called");
    return of([...this.users]);
  }
  
  saveData(data: User): Observable<void> {
    // console.warn("saveData called");
    this.users.push(data);
    return of(undefined);
  }
  
  editData(update: User): Observable<void> {
    // console.warn("editData called");
    const index = this.users.findIndex(i => i.userid === update.userid);
    
    if (index !== -1) {
      this.users[index] = update;
    }
    return of(undefined); 
  }
  
  deleteData(data: User): Observable<void> {
    // console.warn("deleteData called");
    this.users = this.users.filter(x => x.userid !== data.userid);
    return of(undefined);
  }

}
