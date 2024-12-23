import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-helps',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './helps.component.html',
  styleUrl: './helps.component.css'
})
export class HelpsComponent {

  faqs = [
    { question: '1. How do I reset my password?', answer: 'To reset your password, go to the login page and click on "Forgot Password". Follow the instructions to reset your password.' },
    { question: '2. How do I contact customer support?', answer: 'You can contact customer support by clicking on the "Contact Us" link at the bottom of the page or by calling our support hotline.' },
    { question: '3. How do I update my profile information?', answer: 'To update your profile information, go to your account settings and click on "Edit Profile". Make the necessary changes and save.' },
    { question: '4. How do I make a payment?', answer: 'To make a payment, go to the billing section of your account and follow the instructions to complete the payment process.' },
    { question: '5. How do I track my order?', answer: 'To track your order, go to the orders section of your account and click on the order you want to track. You will see the tracking details there.' },
    { question: '6. How do I return a product?', answer: 'To return a product, go to the orders section of your account, select the order you want to return, and follow the instructions for returning the product.' },
    { question: '7. How do I apply a discount code?', answer: 'To apply a discount code, enter the code in the discount code field at checkout and click "Apply". The discount will be applied to your order.' },
    { question: '8. How do I subscribe to the newsletter?', answer: 'To subscribe to the newsletter, enter your email address in the subscription box at the bottom of the page and click "Subscribe".' },
    { question: '9. How do I delete my account?', answer: 'To delete your account, go to your account settings and click on "Delete Account". Follow the instructions to permanently delete your account.' },
    { question: '10. How do I change my notification settings?', answer: 'To change your notification settings, go to your account settings and click on "Notification Settings". Adjust your preferences and save.' }
  ];
}
