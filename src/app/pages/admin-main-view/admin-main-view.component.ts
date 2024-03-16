import { Component, Inject, OnInit } from '@angular/core';
import { Member } from '../../models/Member';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';


export interface LoginDialogData {
  user: string;
  password: string;
  loginCallback(username: string, password: string): Promise<any>;
}

@Component({
  selector: 'app-admin-main-view',
  templateUrl: './admin-main-view.component.html',
  styleUrl: './admin-main-view.component.scss'
})
export class AdminMainViewComponent implements OnInit {
  // További szükséges logika, például bejelentkezési adatok kezelése és kitöltött meghívók betöltése
  error_message = '';
  logoUrl: string = '';
  user: string = '';
  password: string = '';


  constructor(
    // public dialogRef: MatDialogRef<AdminMainViewComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: LoginDialogData,
    private router: Router,
    private authService: AuthService,
  ) {
    // above private configurationService: ConfigurationService,

    // watch out: async call. The logo may not actually be loaded in time for other usages.
    this.loadLogo();
  }

  login(): void {
    this.error_message = '';

    if (this.user === '' || this.password === '') {
      this.error_message = 'User and password are required!';
    }

    this.authService.login(this.user, this.password).subscribe({
      next: (response) => {
        if (response.success) {
          // Sikeres bejelentkezés, átirányítás az admin panelre
          this.router.navigate(['/admin-panel']);
        } else {
          // Sikertelen bejelentkezés, hibaüzenet megjelenítése
          this.error_message = response.message;
        }
      },
      error: (err) => {
        this.error_message = 'Hiba történt a bejelentkezés során!';
        console.error(err);
      }
    });
  }

  loadLogo() {
    // this.logoUrl = this.configurationService.getLogoUrl();
    // if (!this.logoUrl) {
    //   this.configurationService.loadWebshopConfigurations().then(() => {
    //     this.logoUrl = this.configurationService.getLogoUrl(); 
    //   })
    //   .catch((err) => {
    //       console.dir(err);
    //   });
    // }
  }

  ngOnInit(): void {}
}
