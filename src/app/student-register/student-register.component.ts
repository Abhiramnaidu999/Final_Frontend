import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentRService } from '../student-r.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent {

  details: any = {
    address: {}
  };
  files: any = {};
  isSubmitting = false;
  modalVisible = false;
  modalMessage = '';

  constructor(private studentService: StudentRService, private router: Router) { }

  onFileChange(event: any, field: string) {
    this.files[field] = event.target.files[0];
  }

  register() {
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    if (this.validateForm()) {
      this.studentService.register(this.details, this.files).subscribe(
        response => {
          console.log('Registration successful', response);
          this.showModal('Registration successful!');
          const aadhar = this.details.adhar;
          setTimeout(() => {
            this.router.navigate(['/register-success', { aadhar }]);
            this.closeModal();
          }, 2000); // Close modal after 2 seconds
          this.isSubmitting = false;
        },
        error => {
          console.error('Error during registration', error);
          this.showModal('Error during registration. Please try again.');
          this.isSubmitting = false;
        }
      );
    } else {
      this.showModal('Please fill in all required fields correctly.');
      this.isSubmitting = false;
    }
  }

  showModal(message: string) {
    this.modalMessage = message;
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }

  validateForm(): boolean {
    if (!this.details.firstName || !this.details.lastName || !this.details.dob ||
        !this.details.gender || !this.details.contact || !this.details.email ||
        !this.details.instCode || !this.details.accNum || !this.details.adhar ||
        !this.details.ifsc || !this.details.bankName || !this.details.password ||
        !this.details.caste || !this.details.fatherName || !this.details.motherName ||
        !this.details.sscNumber || !this.details.sscboardName || !this.details.sscpassingyear ||
        !this.details.sscMarks || !this.details.interNumber || !this.details.interboardName ||
        !this.details.interpassingyear || !this.details.interMarks ||
        !this.details.maritalStatus || !this.details.fatherprofession ||
        !this.details.address.state || !this.details.address.district ||
        !this.details.address.houseNumber || !this.details.address.street ||
        !this.details.address.pincode) {
      return false;
    }

    // Additional validation checks can be added here (e.g., email format, contact number format)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.details.email)) {
      return false;
    }

    const contactPattern = /^[0-9]{10}$/;
    if (!contactPattern.test(this.details.contact)) {
      return false;
    }

    // Check if all required files are uploaded
    const requiredFiles = ['Aadhar', 'photograph', 'idCard', 'casteCertificate', 'incomeCertificate', 'Bankpassbook', 'SSCmarksheet', 'Intermediatemarksheet'];
    for (const file of requiredFiles) {
      if (!this.files[file]) {
        return false;
      }
    }

    return true;
  }

  resetForm(): void {
    this.details = {
      address: {}
    };
    this.files = {};
  }
}
