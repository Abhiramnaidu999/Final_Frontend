import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentLService {

  private baseUrl = 'http://localhost:8092/api/registration';


  private apiUrl = 'http://localhost:8091/api/student-applications';

 
  constructor(private http: HttpClient) { }


  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials, { responseType: 'text' });
  }
 
  updatePassword(updateCredentials:  { email: string, newPassword: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/student/update-password`, updateCredentials,{ responseType: 'text' });
  }
  getStudentDetailsByAdhar(adhar: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/students/${adhar}/status`);
  }

  getStudentStatusByAadhars(aadhar: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/student/${aadhar}/status`);
  }
  
  getStudentStatusByAadhar(aadhar: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/student/${aadhar}/statusM`);
  }
  
}
