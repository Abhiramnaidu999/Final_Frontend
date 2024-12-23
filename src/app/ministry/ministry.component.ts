import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-ministry',
  standalone: true,
  imports: [CommonModule,RouterModule,RouterLink],
  templateUrl: './ministry.component.html',
  styleUrl: './ministry.component.css'
})
export class MinistryComponent {

}
