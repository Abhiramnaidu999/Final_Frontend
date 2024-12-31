import { Component ,OnInit} from '@angular/core';
import { NodalHService } from '../nodal-h.service';
import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { catchError,of } from 'rxjs';
 
 
 
interface Institute {
  name: string;
  code: string;
  proofInstitute?: string;
  affiliatedDocument?: string;
  isAccepted?: boolean; // Add this field to track acceptance
  [key: string]: any; // Allow indexing with a string
}
@Component({
  selector: 'app-nodal-home',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './nodal-home.component.html',
  styleUrl: './nodal-home.component.css'
})
export class NodalHomeComponent implements OnInit {
  institutes: Institute[] = [];
  selectedInstitute: Institute | null = null;
  isStudentApplicationsVisible: boolean = false;
  isInstituteListVisible: boolean = true; // Default to showing institute list
  pdfUrl: SafeResourceUrl | null = null;
  pdfVisible: boolean = false;
  studentApplications: any[] = [];
  selectedApplication: any = null;
  isApplicationVisible: boolean = false;
  isInstituteDetailsVisible: boolean = false; // New flag for institute details visibility
  modalVisible: boolean = false;
  modalMessage: string = '';
 
 
  constructor(private stateNodalService: NodalHService, private sanitizer: DomSanitizer) {}
 
  ngOnInit(): void {
    this.fetchInstitutes();
  }
 
  fetchInstitutes(): void {
    this.stateNodalService.getInstitutes().subscribe(
      (data: Institute[]) => {
        this.institutes = data;
      },
      (error: any) => {
        console.error("Error fetching institutes:", error);
      }
    );
  }
 
  fetchInstituteDetails(code: string): void {
    this.stateNodalService.getInstitutesByCode(code).subscribe(
      (data: Institute) => {
        this.selectedInstitute = data;
        this.isInstituteDetailsVisible = true; // Show institute details
        console.log(this.selectedInstitute);
      },
      (error: HttpErrorResponse) => {
        console.error("Error fetching institute details:", error);
        if (error.status === 404) {
          alert("Institute not found. Please check the code and try again.");
        } else {
          alert("An error occurred while fetching institute details. Please try again later.");
        }
      }
    );
  }
 
  showInstituteList(): void {
    this.isInstituteListVisible = true;
    this.isStudentApplicationsVisible = false;
    this.isInstituteDetailsVisible = false; // Hide institute details when showing list
  }
 
  showStudentApplications(): void {
    this.isInstituteListVisible = false;
    this.isStudentApplicationsVisible = true;
    this.isInstituteDetailsVisible = false; // Hide institute details when showing student applications
    if (this.studentApplications.length === 0) {
      this.fetchStudentApplications();
    }
  }
 
  fetchStudentApplications(): void {
    this.stateNodalService.getAllStudentApplications().subscribe(applications => {
      console.log('Applications fetched:', applications);
      applications.forEach(application => {
        console.log('Processing application:', application);
        if (application.aadharNumber) {
          this.stateNodalService.compareAadharData(application.aadharNumber).pipe(
            catchError(error => {
              console.error('Error comparing Aadhar data:', error);
              if (error.status === 503) {
                alert('Service is currently unavailable. Please try again later.');
              }
              return of(null); // Return a null observable to continue the stream
            })
          ).subscribe(result => {
            if (result === 'Aadhar data matches.') {
              this.studentApplications.push(application);
            } else {
              console.log(`Aadhar number ${application.aadharNumber} did not match`);
            }
          });
        } else {
          console.error('Aadhar number is missing for application:', application);
        }
      });
    });
  }
 
  viewInstituteDetails(code: string): void {
    if (this.selectedInstitute && this.selectedInstitute.code === code) {
      this.isInstituteDetailsVisible = !this.isInstituteDetailsVisible; // Toggle visibility
    } else {
      this.fetchInstituteDetails(code);
    }
  }
 
  acceptInstitute(code: string): void {
    const institute = this.institutes.find(inst => inst.code === code);
    if (institute) {
        // Check if the institute is already accepted in local storage
        let acceptedInstitutes = JSON.parse(localStorage.getItem('acceptedInstitutes') || '[]');
        const isAlreadyAccepted = acceptedInstitutes.some((inst: any) => inst.code === code);
 
        if (isAlreadyAccepted) {
            this.showModal("Already accepted");
        } else {
            institute.isAccepted = true;
            console.log(`Institute with code ${code} accepted.`);
            this.showModal("Accepted by state, sent to ministry");
 
            // Store the acceptance status in local storage
            acceptedInstitutes.push({ code: code, message: "Accepted by state, sent to ministry" });
            localStorage.setItem('acceptedInstitutes', JSON.stringify(acceptedInstitutes));
        }
    }
}
 
 
rejectInstitute(code: string): void {
  this.stateNodalService.deleteInstitute(code).subscribe(
      response => {
          console.log(`Institute with code ${code} rejected.`);
          this.showModal("Institute Rejected!");
          this.institutes = this.institutes.filter(inst => inst.code !== code);
      },
      (error: HttpErrorResponse) => {
          console.error("Error rejecting institute:", error);
          this.showModal("An error occurred while rejecting the institute. Please try again later.");
      }
  );
}
 
  toggleStudentApplications(): void {
    this.isStudentApplicationsVisible = !this.isStudentApplicationsVisible;
    if (this.isStudentApplicationsVisible && this.studentApplications.length === 0) {
      this.stateNodalService.getAllStudentApplications().subscribe(applications => {
        console.log('Applications fetched:', applications);
        applications.forEach(application => {
          console.log('Processing application:', application);
          if (application.aadharNumber) {
            this.stateNodalService.compareAadharData(application.aadharNumber).subscribe(result => {
              if (result === 'Aadhar data matches.') {
                this.studentApplications.push(application);
              } else {
                console.log(`Aadhar number ${application.aadharNumber} did not match`);
              }
            });
          } else {
            console.error('Aadhar number is missing for application:', application);
          }
        });
      });
    }
  }
 
  viewApplication(aadhar: string): void {
    if (this.selectedApplication && this.selectedApplication.aadharNumber === aadhar) {
      this.isApplicationVisible = !this.isApplicationVisible;
    } else {
      this.stateNodalService.getStudentApplicationByAadhar(aadhar).subscribe(
        (data: any) => {
          if (Array.isArray(data) && data.length > 0) {
            this.selectedApplication = data[0]; // Set to the first element of the array
          } else {
            this.selectedApplication = data; // Handle case where data is not an array
          }

          // Remove the status and statusM fields
          delete this.selectedApplication.status;
          delete this.selectedApplication.statusM;

          this.isApplicationVisible = true;
          console.log('Selected application:', this.selectedApplication);
        },
        (error: HttpErrorResponse) => {
          console.error(`Error fetching application details for Aadhar ${aadhar}:`, error);
          alert("An error occurred while fetching application details. Please try again later.");
        }
      );
    }
  }

 
  acceptApplication(aadhar: string): void {
    const application = this.studentApplications.find(app => app.aadharNumber === aadhar);
    if (application) {
      // Check if the application is already accepted in local storage
      let acceptedApplications = JSON.parse(localStorage.getItem('acceptedApplications') || '[]');
      const isAlreadyAccepted = acceptedApplications.includes(aadhar);
  
      if (isAlreadyAccepted) {
        this.showModal("Already accepted");
      } else {
        this.stateNodalService.updateApplicationStatus(aadhar, 'Accepted').subscribe(
          () => {
            application.isAccepted = true;
            console.log(`Application with Aadhar number ${aadhar} accepted.`);
            this.showModal("Application accepted by state, sent to ministry");
  
            // Store the acceptance status in local storage
            acceptedApplications.push(aadhar);
            localStorage.setItem('acceptedApplications', JSON.stringify(acceptedApplications));
          },
          (error: any) => {
            console.error(`Error updating application status for Aadhar ${aadhar}:`, error);
            this.showModal("An error occurred while accepting the application. Please try again later.");
          }
        );
      }
    } else {
      console.error(`Application with Aadhar number ${aadhar} not found.`);
      this.showModal("Application not found. Please check the Aadhar number and try again.");
    }
  }
  

  showModal(message: string) {
    this.modalMessage = message;
    this.modalVisible = true;
  }
 
  closeModal() {
    this.modalVisible = false;
  }
 
  rejectApplication(aadhar: string): void {
    this.stateNodalService.deleteStudentApplication(aadhar).subscribe(
        response => {
            console.log(`Application with Aadhar number ${aadhar} rejected.`);
            this.showModal("Application rejected and deleted successfully!");
            this.studentApplications = this.studentApplications.filter(app => app.aadharNumber !== aadhar);
        },
        (error: HttpErrorResponse) => {
            console.error("Error rejecting application:", error);
            this.showModal("An error occurred while rejecting the application. Please try again later.");
        }
    );
}
 
  isSensitiveField(key: string): boolean {
    return key === 'password' || key === 'confirmPassword';
  }
 
  isPdfField(fieldName: unknown): boolean {
    const pdfFields = ['proofInstitute', 'affiliatedDocument'];
    return typeof fieldName === 'string' && pdfFields.includes(fieldName);
  }
 
  showPdf(fieldName: unknown): void {
    if (typeof fieldName === 'string' && this.selectedInstitute) {
      const base64 = this.selectedInstitute[fieldName];
      console.log('Base64 string:', base64); // Debugging log
      if (this.isValidBase64(base64)) {
        const blobUrl = this.convertBase64ToBlobUrl(base64);
        console.log('Blob URL:', blobUrl); // Debugging log
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
        this.pdfVisible = true;
      } else {
        console.error('Invalid base64 string for field:', fieldName);
      }
    }
  }
 
  hidePdf(): void {
    this.pdfVisible = false;
  }
 
  isValidBase64(base64: string): boolean {
    try {
      atob(base64);
      return true;
    } catch (e) {
      return false;
    }
  }
 
  convertBase64ToBlobUrl(base64: string): string {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  }
}