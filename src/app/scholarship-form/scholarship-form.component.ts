import { Component } from '@angular/core';
import { StudentApplication } from '../model/student-application.model';
import { StudentApplicationService } from '../services/student-application.service';
import { FormsModule, NgForm } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-scholarship-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './scholarship-form.component.html',
  styleUrls: ['./scholarship-form.component.css']
})
export class ScholarshipFormComponent {

    studentApplication: StudentApplication = new StudentApplication();
    modalVisible: boolean = false;
    modalMessage: string = '';
  
    constructor(private studentApplicationService: StudentApplicationService, private router: Router) { }
  
    async onSubmit(form: NgForm) {
      if (form.invalid) {
        this.showModal('Please fill all required fields.');
        return;
      }
  
      try {
        // Convert aadharNumber to string
        const aadharNumberString = this.studentApplication.aadharNumber.toString();
  
        // // Check for duplicate entries
        // const isDuplicate = await firstValueFrom(this.studentApplicationService.checkDuplicate(aadharNumberString));
        // if (isDuplicate) {
        //   this.showModal('Duplicate entry detected. Please check your Aadhar Number.');
        //   return;
        // }
  
        // Submit the application if no duplicates are found
        const response = await firstValueFrom(this.studentApplicationService.createStudentApplication(this.studentApplication));
       
        this.showModal('Application submitted successfully');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      } catch (error) {
        this.showModal('Error submitting application');
      }
    }
  
    resetForm(form: NgForm) {
      form.resetForm();
      this.studentApplication = new StudentApplication();
    }
  
    showModal(message: string) {
      this.modalMessage = message;
      this.modalVisible = true;
    }
  
    closeModal() {
      this.modalVisible = false;
    }

  }
