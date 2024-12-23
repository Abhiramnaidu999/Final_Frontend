import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


 
interface Institute {
  name: string;
  code: string;
}
 

@Injectable({
  providedIn: 'root'
})
export class NodalHService {

  private apiUrl = 'http://localhost:8084/api';
  private baseUrl='http://localhost:8091/api/student-applications';
 
  constructor(private http: HttpClient) { }
 
  getInstitutes(): Observable<Institute[]> {
    return this.http.get<Institute[]>(`${this.apiUrl}/institute`);
 
  }
 
  getInstituteByCode(code: string): Observable<Institute> {
    return this.http.get<Institute>(`${this.apiUrl}/institute/${code}`);
  }
 
  getInstitutesByCode(code: string): Observable<Institute> {
    return this.http.get<Institute>(`${this.apiUrl}/getInstitutebycode/${code}`);
  }
 
  deleteInstitute(code: string): Observable<string> {
    return this.http.delete(`${this.apiUrl}/deleteinstitutes/${code}`, { responseType: 'text' })
  }
 
 
  compareAadharData(aadhar: string): Observable<string> {
    console.log(`Comparing Aadhar data for: ${aadhar}`);
    return this.http.get(`${this.baseUrl}/compare/aad/${aadhar}`, { responseType: 'text' });
  }
 
  getAllStudentApplications(): Observable<any[]> {
    console.log('Fetching all student applications');
    return this.http.get<any[]>(`${this.baseUrl}/display`);
  }
 
  getStudentApplicationByAadhar(aadhar: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/displays/${aadhar}`);
  }
 
  deleteStudentApplication(aadharNumber: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/student/${aadharNumber}`);
  }
}
