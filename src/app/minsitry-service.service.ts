import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
 
 
@Injectable({
  providedIn: 'root'
})
export class MinsitryServiceService{
 
  private baseUrl = 'http://localhost:8085/ministry';
 
  constructor(private http: HttpClient) { }
 
 
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials, { responseType: 'text' });
  }
  updatePassword(updateCredentials:  { email: string, newPassword: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/ministry/update-password`, updateCredentials,{ responseType: 'text' });
  }
 
}
 