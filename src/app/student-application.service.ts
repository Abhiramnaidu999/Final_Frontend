import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentApplicationService {
  private apiUrl = 'http://localhost:8091/api/student-applications';

  constructor(private http: HttpClient) { }

  getAllStudentApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/display`);
  }
  deleteStudentApplication(aadharNumber: String): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/student/{aadharNumber}`);
  }
}
