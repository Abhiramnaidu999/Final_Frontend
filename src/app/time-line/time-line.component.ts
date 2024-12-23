import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-time-line',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-line.component.html',
  styleUrl: './time-line.component.css'
})
export class TimeLineComponent {

  timeline = [
    {
      phase: 'Application Start',
      description: 'The scholarship application process begins. Students can start submitting their applications online.'
    },
    {
      phase: 'Application Deadline',
      description: 'The last date to submit scholarship applications. Ensure all required documents are uploaded.'
    },
    {
      phase: 'Verification',
      description: 'Submitted applications are verified by the respective authorities to ensure eligibility and completeness.'
    },
    {
      phase: 'Approval',
      description: 'Verified applications are approved by the scholarship committee.'
    },
    {
      phase: 'Disbursement',
      description: 'Scholarship funds are disbursed to the selected students.'
    }
  ];

}
