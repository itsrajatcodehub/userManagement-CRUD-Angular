import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserModuleComponent } from './user-module.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  // { path: '', component: UserModuleComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: UserListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModuleRoutingModule { }
