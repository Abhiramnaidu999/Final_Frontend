import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpdeskComponent } from '../helpdesk/helpdesk.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HelpdeskComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class HomeComponent {

  // Array of image paths
images: string[] = [
  'assets/images/merit.jpg',  // Replace with your image paths
  'assets/images/post.jpg',
  'assets/images/pragati.jpg'
];

// Active image index


// Function to move to the left (previous image)
// Tracks the currently active image
activeIndex: number = 0;

// Method to move the carousel to the left
moveLeft(): void {
  if (this.activeIndex === 0) {
    this.activeIndex = this.images.length - 1; // Loop back to the last image
  } else {
    this.activeIndex--;
  }
}

// Method to move the carousel to the right
moveRight(): void {
  if (this.activeIndex === this.images.length - 1) {
    this.activeIndex = 0; // Loop back to the first image
  } else {
    this.activeIndex++;
  }
}

}
