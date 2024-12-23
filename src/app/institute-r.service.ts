import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class InstituteRService {

 
  private baseUrl = 'http://localhost:8084/api'; // Replace with your backend URL
 
  constructor(private http: HttpClient) {}
 
  // Method to handle the form data and file uploads
  register(details: any, files: { proofInstitute: File, affiliatedDocument: File }): Observable<any> {
    const formData: FormData = new FormData();
 
    // Append form details as a JSON string
    formData.append('institute', JSON.stringify(details));
 
    // Append file inputs with correct keys
    formData.append('proofInstitute', files.proofInstitute);
    formData.append('affiliatedDocument', files.affiliatedDocument);
 
    // Log formData for debugging
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
 
    // POST request to backend API
    return this.http.post(`${this.baseUrl}/institutes`, formData);
  }
 
   // New method to get institute name by code
  getInstituteName(code: string): Observable<string> {
    return this.http.get(`${this.baseUrl}/getInstituteName/${code}`, { responseType: 'text' });
  }
 
  // New method to get student details by Aadhar number
  getStudentDetailsByAadhar(aadhar: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${aadhar}`);
  }
}
