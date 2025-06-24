import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController, LoadingController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  loginForm: FormGroup;
  showPassword = false;
  isDarkMode = false;  // Kalau mau dark mode toggle

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private api: ApiService
  ) {
    this.loginForm = this.fb.group({
      nik: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      this.showToast('NIK dan password wajib diisi');
      return;
    }
  
    const loading = await this.loadingCtrl.create({
      message: 'Sedang masuk...',
      spinner: 'crescent'
    });
    await loading.present();
  
    const { nik, password } = this.loginForm.value;
  
    this.api.post<any>('login', { nik, password })
      .subscribe({
        next: async (res) => {
          await loading.dismiss();
        
          if (res.access_token) {
            localStorage.setItem('access_token', res.access_token);
            localStorage.setItem('user', JSON.stringify(res.user));
          
            this.showToast('Login berhasil');
            this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
          } else {
            this.showToast('Login gagal');
          }
        },
        error: async (err) => {
          await loading.dismiss();
          this.showToast('NIK atau password salah');
        }
      });
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top'
    });
    await toast.present();
  }
}
