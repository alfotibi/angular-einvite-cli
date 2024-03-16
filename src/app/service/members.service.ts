import { Member } from './../models/Member';
import { EventEmitter, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { CommunicationService } from './communication.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
//#region define Service management members
  localStorageAccessKey: string = 'partyMembers';
  renderPDFTemplate = false;
  private membersSource = new BehaviorSubject<any>([]);
  member = this.membersSource.asObservable();
  private members: Member[] = [];
//#endregion
//#region define Event emitters for Member Collection
  public partyMemberControllerEvent: EventEmitter<void> = new EventEmitter<void>();
  public partyMembersResetEvent: EventEmitter<void> = new EventEmitter<void>();
  public partyMembersUpdateEvent: EventEmitter<void> = new EventEmitter<void>();
  public partyMembersCollectionChangedEvent: EventEmitter<void> = new EventEmitter<void>();

//#endregion

  public constructor(private dialog: MatDialog, private communication: CommunicationService) {
      this.initMembersUpdateEmitters();
      if (typeof localStorage !== 'undefined') {
        this.initMembersContentFromLocalStorage();
      } else {
        console.error('A localStorage nem érhető el');
      }
   }

  getMembers(): Member[] {
    return this.members
  }

   initMembersUpdateEmitters(): void {
    this.partyMembersResetEvent.subscribe(() => { this.partyMemberControllerEvent.emit(); });
    this.partyMembersUpdateEvent.subscribe(() => { this.partyMemberControllerEvent.emit(); });
    this.partyMembersCollectionChangedEvent.subscribe(() => { this.partyMemberControllerEvent.emit(); });
   }

   storeMembersContentToLocalStorage(){
    localStorage.setItem(this.localStorageAccessKey, JSON.stringify(this.members));
   }

   initMembersContentFromLocalStorage() {
    const members = JSON.parse(localStorage.getItem(this.localStorageAccessKey) ?? '[]');
    if (members.length > 0) {
      members.forEach((member: Member) => {
        this.partyMembersCollectionChangedEvent.emit();
        this.members.push(member);
      });
    }
    else {
      this.members = [];
    }
  }

  public addMemberToCollection(member: Member): void {
      if (!member.Id) {
        return;
      }
      let memberToCollection = this.members.find(p => p.Id === member.Id);
      if(memberToCollection)
        console.log("${member} exists..");
      else {
        this.members.push(member);
      }
    this.membersSource.next([]);
    this.storeMembersContentToLocalStorage();
    this.partyMembersCollectionChangedEvent.emit();
  }

  public removeMemberFromCollection(index: number){
    this.members.splice(index, 1)
    this.storeMembersContentToLocalStorage();
    this.partyMembersCollectionChangedEvent.emit();
  }

  public registerMembers() {
    return this.communication.createMembers(this.members);
    
  }

  public resetMembers() {
    this.members = [];
    localStorage.removeItem(this.localStorageAccessKey);
  }
}
