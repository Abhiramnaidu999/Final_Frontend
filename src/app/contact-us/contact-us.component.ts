import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';



@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  modalVisible: boolean = false;
  modalMessage: string = '';

  onSubmit(event: Event): void {
    event.preventDefault();
    this.modalMessage = 'Thank you for your message! Our team appreciates your valuable time and will get back to you shortly.';
    this.modalVisible = true;
  }

  closeModal(): void {
    this.modalVisible = false;
  }

}
