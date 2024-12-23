import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-whoare-eligible',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whoare-eligible.component.html',
  styleUrl: './whoare-eligible.component.css'
})
export class WhoareEligibleComponent {

    eligibilityCriteria = [
      {
        title: 'Merit-based Scholarship',
        criteria: [
          'Students with outstanding academic performance.',
          'Minimum GPA of 3.5 or equivalent.',
          'Participation in extracurricular activities is a plus.'
        ]
      },
      {
        title: 'Post-Matric Scholarship',
        criteria: [
          'Students who have passed matriculation exams.',
          'Enrolled in a recognized higher education institution.',
          'Family income below a specified threshold.'
        ]
      },
      {
        title: 'Pragati Scholarship',
        criteria: [
          'Girl students pursuing higher education.',
          'Minimum GPA of 3.0 or equivalent.',
          'Family income below a specified threshold.'
        ]
      }
    ];
}
