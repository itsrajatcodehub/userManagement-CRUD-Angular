import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
})
export class HomeComponent {
  constructor(private router: Router){}

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }
}
