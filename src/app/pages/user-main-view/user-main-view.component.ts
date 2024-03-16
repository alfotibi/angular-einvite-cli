import { Router } from '@angular/router';
import { Member } from './../../models/Member';
import { MembersService } from './../../service/members.service';
import { Component, OnInit, Inject, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserFormDialogboxComponent } from '../user-form-dialogbox/user-form-dialogbox.component';
import { ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-main-view',
  templateUrl: './user-main-view.component.html',
  styleUrl: './user-main-view.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class UserMainViewComponent implements OnInit {
  isLoading = false;
  title = 'Kedves barátaink és családtagjaink, 🎉';
  members: Member[] = [];
  member!: Member;
  submitButtonText: string = 'Visszajelzés beküldése';

  constructor(private router: Router, private cdr: ChangeDetectorRef, 
    public memberService: MembersService, private snackBar: MatSnackBar, public memberFormDialog: MatDialog){
  }
  
  ngOnInit(): void {
    this.closeExistingDialogs();
    this.memberService.partyMembersCollectionChangedEvent.subscribe((members) => {
      this.members = this.memberService.getMembers();
    });
    this.memberService.partyMembersCollectionChangedEvent.emit();
  }

  openAddNewMemberDialog(member?: Member): void{
    this.closeExistingDialogs();
    this.memberFormDialog.open(UserFormDialogboxComponent, {
      hasBackdrop: true,
    });
    
  }

  deleteMember(index: number): void {
    // delete this.members[index];
    this.memberService.removeMemberFromCollection(index);
    
  }

  closeExistingDialogs() {
    if (this.memberFormDialog.openDialogs){
      this.memberFormDialog.closeAll();
    }
  }

  submitInvitation(): void {
    // Ide írd a logikát a Member hozzáadásához a szolgáltatásodon keresztül
    // Példa: this.memberService.submitInvitation(this.members);
    this.isLoading = true;
    // Feltételezzük, hogy a 'registrationService' a regisztrációs kéréseket kezeli
    this.memberService.registerMembers().subscribe({
      next: (response) => {
        // A válasz feldolgozása...
        this.showSnackBar('A regisztráció sikeres volt!', 'OK');
        this.goToThankYouSlide();
      },
      error: (error) => {
        // Hiba kezelése...
        this.isLoading = false;
        this.showSnackBar('Hiba történt a regisztráció során.', 'Rendben');
        //this.showSnackBar('A regisztráció sikeres volt!', 'OK');
      },
      complete: () => {
        // Miután befejeződött a kérés, eltűnik a spinner és átváltunk az utolsó slide-ra
        this.isLoading = false;
        this.goToThankYouSlide();
      }
    });
    this.memberService.resetMembers();
    this.showSnackBar('A regisztráció sikeres volt!', 'OK');
    this.goToThankYouSlide();
  }

  // showSnackBar(message: string, action: string) {
  //   this.snackBar.open(message, action, {
  //     duration: 3000, // 3 másodpercig látható
  //   });
  // }
  showSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 3000,
    panelClass: ['custom-snackbar'] // Használd itt a saját osztályodat
  });
}

  goToThankYouSlide() {
    this.router.navigateByUrl('/user');
  }
}
