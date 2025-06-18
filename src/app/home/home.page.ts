import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(private router: Router) {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }
}
