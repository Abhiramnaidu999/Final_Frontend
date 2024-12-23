import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NodalLService {



  private baseUrl = 'http://localhost:8086/api/officers';
 
  constructor(private http: HttpClient) {}
 
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials, { responseType: 'text' });
  }
 
  updatePassword(updateCredentials: { username: string, newPassword: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/update-password`, updateCredentials, { responseType: 'text' });
  }
}
