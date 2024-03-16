import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-landing-page',
  templateUrl: './user-landing-page.component.html',
  styleUrl: './user-landing-page.component.scss'
})
export class UserLandingPageComponent {

  constructor(private _router: Router){}

  navigateToInvitation(){
    this._router.navigate(['/stepper']); 
  }
}
