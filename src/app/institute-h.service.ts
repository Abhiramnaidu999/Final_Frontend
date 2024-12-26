import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstituteHService {

  private baseUrl = 'http://localhost:8092/api/registration';
  private apiUrl = 'http://localhost:8084/api';
 
  constructor(private http: HttpClient) {}
 
  getInstituteDetails(instCode: string): Observable<any> {
    console.log(`Fetching institute details for code: ${instCode}`);
    return this.http.get(`${this.baseUrl}/institute/${instCode}`);
  }
 
  getStudentDetailsByInstituteCode(instCode: string): Observable<any[]> {
    console.log(`Fetching student details for institute code: ${instCode}`);
    return this.http.get<any[]>(`${this.baseUrl}/institutes/${instCode}/students`);
  }
 
  getInstituteName(instCode: string): Observable<string> {
    console.log(`Fetching institute name for code: ${instCode}`);
    return this.http.get(`${this.apiUrl}/getInstituteName/${instCode}`, { responseType: 'text' });
  }
 
  getStudentDetailsByAadhar(aadhar: string): Observable<any> {
    console.log(`Fetching student details for Aadhar: ${aadhar}`);
    return this.http.get<any>(`${this.baseUrl}/users/${aadhar}`);
  }
 
  deleteStudent(adhar: string): Observable<any> {
    console.log(`Deleting student with Aadhar: ${adhar}`);
    return this.http.delete(`${this.baseUrl}/student/${adhar}`, { responseType: 'text' });
  }

  updateApplicationStatus(adhar: string, status: string): Observable<any> {
    console.log(`Updating application status for Aadhar: ${adhar} to ${status}`);
    return this.http.post<any>(`${this.baseUrl}/students/${adhar}/status`, { status });
  }
}
