import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scholarships-offered',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scholarships-offered.component.html',
  styleUrl: './scholarships-offered.component.css'
})
export class ScholarshipsOfferedComponent {

    scholarships = [
      {
        title: 'Merit-based Scholarship',
        description: 'Scholarships awarded to students based on academic excellence and achievements.'
      },
      {
        title: 'Post-Matric Scholarship',
        description: 'Scholarships for students pursuing higher education after matriculation.'
      },
      {
        title: 'Pragati Scholarship',
        description: 'Scholarships specifically for girl students to promote higher education among women.'
      }
    ];
  

}
