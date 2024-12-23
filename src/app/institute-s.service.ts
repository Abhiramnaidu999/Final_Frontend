import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InstituteSService {

  private baseUrl = 'http://localhost:8084/api'; //  backend URL
 
  constructor(private http: HttpClient) {}
 
  login(loginRequest: { code: string, password: string }): Observable<string> {
    return this.http.post(`${this.baseUrl}/institutes/login`, loginRequest, { responseType: 'text' });
  }

  updatePassword(updateRequest: { code: string, newPassword: string }): Observable<string> {
    return this.http.post(`${this.baseUrl}/institute/update-password`, updateRequest, { responseType: 'text' });
  }

   

}
