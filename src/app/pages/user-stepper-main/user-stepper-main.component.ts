import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-user-stepper-main',
  templateUrl: './user-stepper-main.component.html',
  styleUrl: './user-stepper-main.component.scss',
})
export class UserStepperMainComponent  implements OnInit {
  @ViewChild('stepper') private _stepper!: MatStepper
  cover: any = "../../../assets/img/COPERTA.jpg"
  flipped = false;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  show = true;

  ngOnInit(): void {
  }

  flipIt() {
    this.flipped = !this.flipped;
  }

  onStepChange(event: any) {
    if (event.selectedIndex === 0 || event.selectedIndex === 1){
      this.flipIt();
    }
  }

  doClick(btn: any) {
    //alert(`you clicked the ${btn} button`)
    if (btn == 'left') {
      this._stepper.previous();
    }
    else {
      this._stepper.next();
    }
    if (this._stepper.selectedIndex === 0 || this._stepper.selectedIndex === 1) {
      this.flipIt();
    }
    
  }
  
  constructor(private _formBuilder: FormBuilder){}
}
