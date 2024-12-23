import { Component } from '@angular/core';
import { InstituteRService } from '../institute-r.service';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-institute-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './institute-register.component.html',
  styleUrl: './institute-register.component.css'
})
export class InstituteRegisterComponent {

  instituteForm: FormGroup;
  proofInstituteFile: File | null = null;
  affiliatedDocumentFile: File | null = null;
  modalVisible = false;
  modalMessage = '';
 
  constructor(
    private fb: FormBuilder,
    private instituteService: InstituteRService,
    private router :Router
  ) {
    this.instituteForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      state: ['', Validators.required],
      location: ['', Validators.required],
      district: ['', Validators.required],
      diseCode: ['', Validators.required],
      instituteType: ['', Validators.required],
      affiliatedBy: ['', Validators.required],
      yearStarted: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      affiliatedUniversity: ['', Validators.required],
      affiliatedTo: ['', Validators.required],
      address: ['', Validators.required],
      principalName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      telephone: ['', Validators.required],
    });
  }
 
  onFileChange(event: any, fileType: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (fileType === 'proofInstitute') {
        this.proofInstituteFile = file;
      } else if (fileType === 'affiliatedDocument') {
        this.affiliatedDocumentFile = file;
      }
    }
  }
 
  onSubmit() {
    console.log('Form Values:', this.instituteForm.value);
    console.log('Proof Institute File:', this.proofInstituteFile);
    console.log('Affiliated Document File:', this.affiliatedDocumentFile);

    if (this.instituteForm.valid && this.proofInstituteFile && this.affiliatedDocumentFile) {
      const formValues = this.instituteForm.value;
      const files = {
        proofInstitute: this.proofInstituteFile,
        affiliatedDocument: this.affiliatedDocumentFile
      };

      this.instituteService.register(formValues, files).subscribe(
        response => {
          this.showModal('Institute registered successfully');
          setTimeout(() => {
            this.router.navigate(['/home']);
            this.closeModal();
          }, 2000); // Close modal after 2 seconds
        },
        error => {
          console.error('Error registering institute', error);
          this.showModal('Error registering institute. Please try again.');
        }
      );
    } else {
      this.showModal('Form is invalid or files are missing');
      this.instituteForm.markAllAsTouched(); // Highlight all invalid fields
    }
  }

  showModal(message: string) {
    this.modalMessage = message;
    this.modalVisible = true;
  }

  closeModal() {
    this.modalVisible = false;
  }
}
