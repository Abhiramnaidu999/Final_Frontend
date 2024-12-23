import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MinsitryServiceService } from '../minsitry-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ministry-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './ministry-login.component.html',
  styleUrl: './ministry-login.component.css'
})
export class MinistryLoginComponent {

  credentials: any = {};
  updateCredentials = { email: '', newPassword: '' };
  forgotPassword = false;
  modalVisible: boolean = false;
  modalMessage: string = '';

  constructor(private ministryService: MinsitryServiceService, private router: Router) { }

  login() {
    this.ministryService.login(this.credentials).subscribe(
      response => {
        console.log('Login successful', response);
        this.showModal('Login successful');
        setTimeout(() => {
          this.router.navigate(['/MinistryH']);
        }, 2000);
      },
      error => {
        console.error('Error during login', error);
        this.showModal('Error during registration. Please try again.');
      }
    );
  }

  showForgotPasswordForm() {
    this.forgotPassword = true;
  }

  updatePassword() {
    this.ministryService.updatePassword(this.updateCredentials).subscribe(
      response => {
        console.log('Password updated successfully', response);
        this.showModal('Password updated successfully');
        setTimeout(() => {
          this.forgotPassword = false;
        }, 2000);
      },
      error => {
        console.error('Error updating password', error);
        this.showModal('Error updating password. Please try again.');
      }
    );
  }

  showModal(message: string) {
    this.modalMessage = message;
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }

}
