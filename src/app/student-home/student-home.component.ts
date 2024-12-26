import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScholarshipFormComponent } from '../scholarship-form/scholarship-form.component';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { StudentLService } from '../student-l.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-student-home',
  standalone: true,
  imports: [CommonModule, ScholarshipFormComponent, RouterLink],
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
  showForm = false;
  adhar: string = '';
  studentStatus: string = '';

  studentStatu: string = '';
  studentStat: string = '';

  schemes = [
    {
      title: 'Merit-based Scholarship',
      description: 'Scholarships for outstanding students based on academic performance.'
    },
    {
      title: 'Post-Matric Scholarship',
      description: 'Scholarships for students pursuing higher education.'
    },
    {
      title: 'Pragati Scholarship',
      description: 'Scholarships for girl students to promote education.'
    }
  ];

  constructor(private route: ActivatedRoute, private studentService: StudentLService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.adhar = params.get('adhar')!;

      this.fetchStudentDetails(this.adhar);

      this.fetchStudentDetail(this.adhar);

      this.fetchStudentDetai(this.adhar);
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  fetchStudentDetails(adhar: string): void {
    this.studentService.getStudentDetailsByAdhar(adhar).subscribe(response => {
      this.studentStatus = response.status;
    });
  }

  fetchStudentDetail(adhar: string): void {
    this.studentService.getStudentStatusByAadhars(adhar).subscribe(response => {
      this.studentStatu = response.status;
    });
  }

  fetchStudentDetai(aadhar: string): void {
    this.studentService.getStudentStatusByAadhar(aadhar).subscribe(response => {
      console.log(response); // Check the response
      this.studentStat = response.statusM;
      this.cdr.detectChanges(); 
    });
  }
  



}


  

