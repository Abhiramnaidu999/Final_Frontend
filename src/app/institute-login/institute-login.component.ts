import { Component } from '@angular/core';
import { InstituteSService } from '../institute-s.service';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-institute-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './institute-login.component.html',
  styleUrl: './institute-login.component.css'
})
export class InstituteLoginComponent {
  loginForm: FormGroup;
  updatePasswordForm: FormGroup;
  showForgotPasswordForm = false;
  modalVisible = false;
  modalMessage = '';
 
  constructor(
    private fb: FormBuilder,
    private loginService: InstituteSService ,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      code: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.updatePasswordForm = this.fb.group({
      code: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }
 
  onSubmit() {
    if (this.loginForm.valid) {
      const loginRequest = this.loginForm.value;

      this.loginService.login(loginRequest).subscribe(
        response => {
          const instituteCode = this.loginForm.get('code')?.value;
          this.router.navigate(['/instituteH', instituteCode]); // Navigate to InstituteHomepageComponent with institute code
        },
        error => {
          this.showModal('Invalid credentials!');
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

      this.loginService.updatePassword(updateRequest).subscribe(
        response => {
          console.log('Update password response:', response);
          this.showModal('Password updated successfully!');
          setTimeout(() => {
            this.showForgotPasswordForm = false;
            this.closeModal();
          }, 2000); // Close modal after 2 seconds
        },
        error => {
          console.error('Update password error:', error);
          this.showModal('Error updating password. Please try again.');
        }
      );
    } else {
      this.showModal('Form is invalid');
      this.updatePasswordForm.markAllAsTouched(); // Highlight all invalid fields
    }
  }

}
