import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScholarshipFormComponent } from '../scholarship-form/scholarship-form.component';

@Component({
  selector: 'app-student-home',
  standalone: true,
  imports: [CommonModule, ScholarshipFormComponent],
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent {
  showForm = false;

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

  toggleForm() {
    this.showForm = !this.showForm;
  }
}
