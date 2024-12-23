import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StudentRService {

  private baseUrl = 'http://localhost:8092/api/registration';
 
  constructor(private http: HttpClient) { }


  register(details: any, files: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('details', JSON.stringify(details));
    for (const key in files) {
      if (files.hasOwnProperty(key)) {
        formData.append(key, files[key]);
      }
    }
    return this.http.post(`${this.baseUrl}/register`, formData);
  }
}
