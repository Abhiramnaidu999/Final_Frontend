import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-reasons-for-rejection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reasons-for-rejection.component.html',
  styleUrl: './reasons-for-rejection.component.css'
})
export class ReasonsForRejectionComponent {

  reasons = [
    {
      title: 'Incomplete Application',
      description: 'Applications that are missing required information or documents are often rejected.'
    },
    {
      title: 'Eligibility Criteria Not Met',
      description: 'Applicants who do not meet the specified eligibility criteria for the scholarship.'
    },
    {
      title: 'Incorrect Information',
      description: 'Providing false or incorrect information can lead to rejection of the application.'
    },
    {
      title: 'Late Submission',
      description: 'Applications submitted after the deadline are not considered.'
    },
    {
      title: 'Lack of Supporting Documents',
      description: 'Failure to provide necessary supporting documents such as transcripts, proof of income, etc.'
    }
  ];

}
