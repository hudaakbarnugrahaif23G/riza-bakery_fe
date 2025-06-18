import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  isDarkMode = false;

  constructor() {
    this.initDarkMode();
  }

  initDarkMode() {
    // Deteksi preferensi sistem (opsional)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkMode = prefersDark.matches;
    this.updateBodyClass();

    // Listen ke perubahan preferensi sistem
    prefersDark.addEventListener('change', (e) => {
      this.isDarkMode = e.matches;
      this.updateBodyClass();
    });
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.updateBodyClass();
  }

  updateBodyClass() {
    const ionApp = document.querySelector('ion-app');
    if (this.isDarkMode) {
      ionApp?.classList.add('dark');
    } else {
      ionApp?.classList.remove('dark');
    }
  }
}
