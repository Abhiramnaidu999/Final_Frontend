import { Component } from '@angular/core';
import { InstituteHService } from '../institute-h.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-institute-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './institute-home.component.html',
  styleUrls: ['./institute-home.component.css']
})
export class InstituteHomeComponent {

  instituteCode: string | null = null;
  instituteName: string | null = null;
  studentDetails: any;
  selectedStudentDetails: any = null;
  pdfUrl: SafeResourceUrl | null = null;
  pdfBlobUrl: string | null = null;
  pdfVisible: boolean = false;
  acceptedApplicationsSet = new Set<string>();
  modalVisible: boolean = false;
  modalMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private instituteService: InstituteHService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.instituteCode = this.route.snapshot.paramMap.get('instituteCode');
    if (this.instituteCode) {
      this.instituteService.getInstituteName(this.instituteCode).subscribe(
        (response: string) => {
          this.instituteName = response;
          console.log('Institute name:', this.instituteName);
        },
        (error: any) => {
          console.error('Error fetching institute name:', error);
        }
      );

      this.instituteService.getStudentDetailsByInstituteCode(this.instituteCode).subscribe(
        (response: any[]) => {
          this.studentDetails = response;
          console.log('Student details:', this.studentDetails);
        },
        (error: any) => {
          console.error('Error fetching student details:', error);
        }
      );
    }
  }

  fetchStudentDetails(adhar: string) {
    console.log(`Fetching details for Aadhar: ${adhar}`);
    this.instituteService.getStudentDetailsByAadhar(adhar).subscribe(
      (response: any) => {
        console.log('Response received:', response);
        // Remove address and password fields
        const { address, password, ...filteredDetails } = response;
        this.selectedStudentDetails = filteredDetails;
        console.log('Selected student details:', this.selectedStudentDetails);
      },
      (error: any) => {
        console.error('Error fetching student details:', error);
      }
    );
  }

  acceptApplication(adhar: string) {
    let acceptedApplications = JSON.parse(localStorage.getItem('acceptedApplications') || '[]');

    if (acceptedApplications.includes(adhar)) {
      this.showModal("Application already accepted.");
    } else {
      console.log(`Application for Aadhar ${adhar} accepted.`);
      this.showModal("Application accepted and sent to State Nodal Officer");
      acceptedApplications.push(adhar);
      localStorage.setItem('acceptedApplications', JSON.stringify(acceptedApplications));

      // Send status update to backend
      this.instituteService.updateApplicationStatus(adhar, 'Accepted').subscribe(
        response => console.log(response),
        error => console.error('Error updating application status:', error)
      );
    }
  }

  rejectApplication(adhar: string) {
    this.instituteService.deleteStudent(adhar).subscribe(
      response => {
        console.log(`Application for Aadhar ${adhar} rejected.`);
        // Optionally, refresh the student list or update the UI
        this.studentDetails = this.studentDetails.filter((student: any) => student.adhar !== adhar);
        this.showModal("Application rejected by the institute.");

        // Send status update to backend
        this.instituteService.updateApplicationStatus(adhar, 'Rejected').subscribe(
          response => console.log(response),
          error => console.error('Error updating application status:', error)
        );
      },
      error => {
        console.error('Error rejecting application:', error);
        this.showModal("Failed to reject application.");
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

  isPdfField(fieldName: unknown): boolean {
    const pdfFields = ['aadhar', 'photograph', 'idCard', 'casteCertificate', 'incomeCertificate', 'bankpassbook', 'sscmarksheet', 'intermediatemarksheet'];
    return typeof fieldName === 'string' && pdfFields.includes(fieldName);
  }

  showPdf(fieldName: unknown) {
    if (typeof fieldName === 'string') {
      const base64 = this.selectedStudentDetails[fieldName];
      console.log('Base64 string:', base64); // Debugging log
      if (this.isValidBase64(base64)) {
        const blobUrl = this.convertBase64ToBlobUrl(base64);
        console.log('Blob URL:', blobUrl); // Debugging log
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
        this.pdfBlobUrl = blobUrl;
        this.pdfVisible = true;
      } else {
        console.error('Invalid base64 string for field:', fieldName);
      }
    }
  }

  hidePdf() {
    this.pdfVisible = false;
  }

  private convertBase64ToBlobUrl(base64: string): string {
    try {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error converting base64 to Blob URL:', error, 'Base64:', base64);
      return '';
    }
  }

  private isValidBase64(base64: string): boolean {
    const base64Regex = /^(?:[A-Za-z0-9+\/]{4})*?(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
    return base64Regex.test(base64);
  }
}
