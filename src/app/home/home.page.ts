import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  userName: string = 'User';
  role: string = '';
  materials: any[] = [];
  private refreshSub!: Subscription;
  constructor(
    private router: Router, 
    private http: HttpClient,
    private api: ApiService
  ) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user.name || 'User';
    this.role = user.role || '';

    const token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
  }

  ionViewDidEnter() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user.name || 'User';
    this.role = user.role || '';

    if (this.role === 'gudang') {
      this.loadMaterials();

      this.refreshSub = interval(5000).subscribe(() => {
        this.loadMaterials();
      });
    }
  }

  loadMaterials() {
    this.api.get<any>('material/get_data_raw')
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.materials = res.data;
          }
        },
        error: (err) => {
          console.error('Failed to load materials', err);
        }
      });
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user.name || 'User';
  }

  ngOnDestroy() {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }
}
