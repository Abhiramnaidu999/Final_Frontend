import { Component } from '@angular/core';
import { NodalLService } from '../nodal-l.service';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-nodal-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './nodal-login.component.html',
  styleUrl: './nodal-login.component.css'
})
export class NodalLoginComponent {
  loginForm: FormGroup;
  updatePasswordForm: FormGroup;
  showForgotPasswordForm = false;
  modalVisible: boolean = false;
  modalMessage: string = '';
 
  constructor(
    private fb: FormBuilder,
    private authService: NodalLService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
 
    this.updatePasswordForm = this.fb.group({
      username: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }
 
  onLogin() {
    if (this.loginForm.valid) {
      const loginRequest = this.loginForm.value;
  
      this.authService.login(loginRequest).subscribe(
        response => {
          console.log('Login successful', response);
          this.showModal('Login successful');
          setTimeout(() => {
            this.router.navigate(['/nodalH']);
          }, 2000);
        },
        error => {
          console.error('Error during login', error);
          this.showModal('Error during login. Please try again.');
        }
      );
    } else {
      this.showModal('Form is invalid');
      this.loginForm.markAllAsTouched(); // Highlight all invalid fields
    }
  }
  
  showModal(message: string) {
    this.modalMessage = message;
    this.modalVisible = true;
  }
  
  closeModal() {
    this.modalVisible = false;
  }
  
  toggleForgotPassword() {
    this.showForgotPasswordForm = !this.showForgotPasswordForm;
  }
 
  onUpdatePassword() {
    if (this.updatePasswordForm.valid) {
      const updateRequest = this.updatePasswordForm.value;

      this.authService.updatePassword(updateRequest).subscribe(
        response => {
          console.log('Password updated successfully', response);
          this.showModal('Password updated successfully');
          setTimeout(() => {
            this.showForgotPasswordForm = false;
          }, 2000); // Redirect to login form after 2 seconds
        },
        error => {
          console.error('Error updating password', error);
          this.showModal('Error updating password. Please try again.');
        }
      );
    } else {
      this.showModal('Form is invalid');
      this.updatePasswordForm.markAllAsTouched(); // Highlight all invalid fields
    }
  }


}
