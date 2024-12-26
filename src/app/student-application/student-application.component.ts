import { Component, OnInit } from '@angular/core';
import { StudentApplicationService } from '../student-application.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-application',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-application.component.html',
  styleUrls: ['./student-application.component.css']
})
export class StudentApplicationComponent implements OnInit {

  studentApplications: any[] = [];
  modalVisible: boolean = false;
  modalMessage: string = '';
  confirmRejectApplication: boolean = false;
  applicationToReject: string | null = null;

  constructor(private studentApplicationService: StudentApplicationService) { }

  ngOnInit(): void {
    this.studentApplicationService.getAllStudentApplications().subscribe(
      (data: any[]) => {
        this.studentApplications = data;
      },
      (error) => {
        console.error('Error fetching student applications', error);
      }
    );
  }

  acceptApplication(aadhar: string): void {
    console.log('Aadhar Number:', aadhar); // Log the Aadhar number
    if (!aadhar) {
      console.error('Aadhar number is undefined');
      this.showModal('Error: Aadhar number is undefined.');
      return;
    }
  
    const acceptedApplications = JSON.parse(localStorage.getItem('acceptedApplications') || '[]');
  
    if (acceptedApplications.includes(aadhar)) {
      this.showModal('This application is already accepted.');
    } else {
      this.studentApplicationService.updateApplicationStatus(aadhar, 'Accepted').subscribe(
        () => {
          acceptedApplications.push(aadhar);
          localStorage.setItem('acceptedApplications', JSON.stringify(acceptedApplications));
          this.showModal('The scholarship application has been accepted. The amount will be credited to the account.');
        },
        (error) => {
          console.error(`Error accepting application with Aadhar ${aadhar}:`, error);
          this.showModal('Error accepting application. Please try again.');
        }
      );
    }
  }
  
  
  
  showModal(message: string): void {
    this.modalMessage = message;
    this.modalVisible = true;
  }

  closeModal(): void {
    this.modalVisible = false;
  }

  rejectApplication(aadharNumber: string): void {
    this.applicationToReject = aadharNumber;
    this.confirmRejectApplication = true;
  }

  confirmReject(): void {
    if (this.applicationToReject) {
      this.studentApplicationService.deleteStudentApplication(this.applicationToReject).subscribe(
        () => {
          this.studentApplications = this.studentApplications.filter(app => app.applicationId !== this.applicationToReject);
          this.showModal('The application has been rejected.');
          this.confirmRejectApplication = false;
          this.applicationToReject = null;
        },
        (error) => {
          console.error('Error deleting application', error);
          this.showModal('Error deleting application. Please try again.');
          this.confirmRejectApplication = false;
          this.applicationToReject = null;
        }
      );
    }
  }

  cancelReject(): void {
    this.confirmRejectApplication = false;
    this.applicationToReject = null;
  }
}
