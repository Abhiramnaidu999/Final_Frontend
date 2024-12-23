import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentApplication } from '../model/student-application.model';

@Injectable({
  providedIn: 'root'
})
export class StudentApplicationService {
  private apiUrl = 'http://localhost:8091/api/student-applications';

  constructor(private http: HttpClient) { }

  createStudentApplication(application: StudentApplication): Observable<StudentApplication> {
    return this.http.post<StudentApplication>(`${this.apiUrl}/save`, application);
  }
  checkDuplicate(aadharNumber: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-duplicate/${aadharNumber}`);
  }
  
  


  getAllStudentApplications(): Observable<StudentApplication[]> {
    return this.http.get<StudentApplication[]>(`${this.apiUrl}/display`);
  }

  getStudentApplicationById(id: number): Observable<StudentApplication> {
    return this.http.get<StudentApplication>(`${this.apiUrl}/display/${id}`);
  }

  updateStudentApplication(id: number, application: StudentApplication): Observable<StudentApplication> {
    return this.http.put<StudentApplication>(`${this.apiUrl}/update/${id}`, application);
  }

  deleteStudentApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
