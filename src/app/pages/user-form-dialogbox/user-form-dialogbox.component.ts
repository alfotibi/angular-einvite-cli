import { Member } from './../../models/Member';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import { MembersService } from '../../service/members.service';
import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-form-dialogbox',
  templateUrl: './user-form-dialogbox.component.html',
  styleUrl: './user-form-dialogbox.component.scss',
})
export class UserFormDialogboxComponent implements OnInit  {
  public member!: Member;
  members: Member[] = [];
  memberEmailAddressIsRequested!: boolean;

  allergies: string[] = ['Gluténérzékeny', 'Laktózérzékeny'];
  regexExpForEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  customAllergies: string[] = [];
  customAllergy?: string;
  showCustomAllergyField = false;

  memberDescription = new FormGroup({
    Id: new FormControl<string>(''),
    FirstName: new FormControl<string>('', [Validators.required]),
    LastName: new FormControl<string>('', [Validators.required]),
    Email: new FormControl('', [
                          Validators.required ?? this.members.length < 1,
                          Validators.pattern(this.regexExpForEmail)]),
    RequiresAccommodation: new FormControl<boolean>(false),
    IsVegan: new FormControl<boolean>(false),
    Allergies: new FormControl<string[]>([]),
    CustomAllergies: new FormControl<string>(''),
  }); 

  constructor(  
    public memberService: MembersService,
    private dialogRef: MatDialogRef<UserFormDialogboxComponent>

  ) 
  { 
    this.memberService.partyMembersCollectionChangedEvent.subscribe((members) => {
      this.members = this.memberService.getMembers();
    });
    this.memberService.partyMembersCollectionChangedEvent.emit();
    // this.memberEmailAddressIsRequested = memberService.getMembers().length == 0;
    this.memberEmailAddressIsRequested = this.members.length == 0;
  }

  ngOnInit(): void {
  }


  toggleCustomAllergyField(): void {
    this.showCustomAllergyField = !this.showCustomAllergyField;
    if (!this.showCustomAllergyField) {
      this.memberDescription.get('customAllergy')?.reset();
    }
  }
  
  safeSaveMember(): void {
    console.log(`member: ${this.memberDescription.value}`);
    if (this.memberEmailAddressIsRequested || this.members.length == 0) {
      this.memberDescription.controls.Email.setValidators([Validators.required, Validators.pattern(this.regexExpForEmail)]);
    } else {
      this.memberDescription.controls.Email.clearValidators();
    }
    this.memberDescription.controls.Email.updateValueAndValidity();

    if (this.memberDescription.valid){
      try {
        this.memberDescription.patchValue({
          Id: `member/${uuidv4()}`, // Generálj egy egyedi azonosítót
        });
  
        // Ha a felhasználó egyéni allergiát adott meg, akkor azt hozzáadjuk a kiválasztott allergiákhoz
        if (this.customAllergies.length != 0) {
          const selectedAllergies = this.memberDescription.value.Allergies || [];
          this.customAllergies.forEach(element => {
            selectedAllergies.push(element)
          });
          // selectedAllergies.push(this.customAllergy);
          this.memberDescription.patchValue({ Allergies: selectedAllergies });
        }

        let combinedAllergies = this.memberDescription.value.Allergies || [];
        if (this.showCustomAllergyField && this.memberDescription.value.CustomAllergies) {
          // Tegyük fel, hogy vesszővel elválasztott értékeket várunk
          combinedAllergies = combinedAllergies.concat(this.memberDescription.value.CustomAllergies.split(',').map(allergy => allergy.trim()));
        }
        this.memberDescription.patchValue({ Allergies: combinedAllergies });
  
  
  
        let memberObject = Object.assign(new Member(), this.memberDescription.value);
        this.memberService.addMemberToCollection(memberObject);
        this.dialogRef.close();
        
      } catch (error) {
        console.error(`Hiba történt a tag mentésekor: ${error}`);
      }
    }
  }

  safeDiscardMember() {
    this.dialogRef.close();
  }

  handleAllergyChange(event: any): void {
    const selectedAllergies = this.memberDescription.get('Allergies') as FormControl;
    const allergy = event.source.value;
  
    if (event.checked) {
      selectedAllergies.value.push(allergy);
    } else {
      const index = selectedAllergies.value.indexOf(allergy);
      if (index !== -1) {
        selectedAllergies.value.splice(index, 1);
      }
    }
  
    // Ha a felhasználó egyéni allergiát adott meg, az input mezőt megjelenítjük
    if (allergy === 'Egyéb') {
      this.customAllergy = event.checked ? '' : 'Nincs';
    }
  }

  getFirstNameErrorMessage(){
    // handle first name
    if (this.memberDescription.get('FirstName')?.hasError('required')){
      return 'Családnév kötelezô..';
    }
    return
  }

  getLastNameErrorMessage(){
    // handle first name
    if (this.memberDescription.get('LastName')?.hasError('required')){
      return 'Keresztnév kötelezô..';
    }
    return;
  }

  getEmailErrorMessage() {
    // handle e-mail address    
    if (this.members.length == 0) {
      if (this.memberDescription.get('Email')?.hasError('required')){
        return 'E-mail cím kötelezô..';
      }
  
      if (this.memberDescription.get('Email')?.invalid){
        return 'Helytelen e-mail cím!';
      }
      return;
    }
    return;
  }

}
