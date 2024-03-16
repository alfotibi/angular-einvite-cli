import { Member } from './../models/Member';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private baseUrl = `${environment.baseUrl}/app/api/members`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.baseUrl}`, this.httpOptions).pipe(
      catchError(this.handleError) // handle the error
    );
  }

  getMemberById(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.baseUrl}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError) // handle the error
    );
  }
  
  createMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.baseUrl, member, this.httpOptions).pipe(
      catchError(this.handleError) // handle the error
    );
  }

  createMembers(members: Member[]): Observable<Member[]> {
    // return this.http.post<Member[]>(`${this.baseUrl}/batch`, members);
    return this.http.post<Member[]>(`${this.baseUrl}/batch`, members, this.httpOptions).pipe(
              catchError(this.handleError) // handle the error
            );
  }

  updateMember(id: number, member: Member): Observable<Member> {
    return this.http.put<Member>(`${this.baseUrl}/${id}`, member, this.httpOptions).pipe(
      catchError(this.handleError) // handle the error
    );
  }

  deleteMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError) // handle the error
    );
  }
}
