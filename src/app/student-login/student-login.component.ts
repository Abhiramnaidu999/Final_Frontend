import { Component } from '@angular/core';
import { StudentLService } from '../student-l.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './student-login.component.html',
  styleUrl: './student-login.component.css'
})
export class StudentLoginComponent {


  credentials: any = {};
  updateCredentials = { email: '', newPassword: '' };
  forgotPassword = false;
  modalVisible: boolean = false;
  modalMessage: string = '';

  constructor(private studentService: StudentLService, private router: Router) { 
    
  }

  login() {
    console.log('Login method called');
    this.studentService.login(this.credentials).subscribe(
      response => {
        this.modalMessage = "Login successful";
        this.modalVisible = true;
        setTimeout(() => {
          this.modalVisible = false;
          const adhar = this.credentials.adhar; // Get the adhar number from the credentials
          this.router.navigate(['/studentH', adhar]); // Navigate to the student's homepage with adhar number
        }, 2000);
      },
      error => {
        console.error('Error during login', error);
        this.modalMessage = "Error during registration. Please try again.";
        this.modalVisible = true;
      }
    );
  }
  
  showForgotPasswordForm() {
    this.forgotPassword = true;
  }

  updatePassword() {
    this.studentService.updatePassword(this.updateCredentials).subscribe(
      response => {
        console.log('Password updated successfully', response);
        this.modalMessage = "Password updated successfully";
        this.modalVisible = true;
        setTimeout(() => {
          this.modalVisible = false;
          this.forgotPassword = false;
        }, 2000);
      },
      error => {
        console.error('Error updating password', error);
        this.modalMessage = "Error updating password. Please try again.";
        this.modalVisible = true;
      }
    );
  }

  closeModal() {
    this.modalVisible = false;
  }

}
