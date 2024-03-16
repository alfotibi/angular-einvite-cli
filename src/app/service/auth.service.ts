import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Tegyük fel, hogy ez a bejelentkezési adat
  private correctUsername = 'ZotyoesDorcy17';
  private correctPassword = '2024augusztus17';

  constructor() { }

  // Egy egyszerű bejelentkezési metódus
  login(username: string, password: string): Observable<{success: boolean, message: string}> {
    if (username === this.correctUsername && password === this.correctPassword) {
      return of({ success: true, message: 'Bejelentkezés sikeres!' });
    } else {
      return of({ success: false, message: 'Hibás felhasználónév vagy jelszó!' });
    }
  }
}
