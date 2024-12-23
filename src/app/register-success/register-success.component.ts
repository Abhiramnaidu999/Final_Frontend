import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-success',
  standalone: true,
  imports: [],
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.css']
})
export class RegisterSuccessComponent {

  aadhar: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.aadhar = this.route.snapshot.paramMap.get('aadhar') || '';
  }

  navigateToLogin() {
    this.router.navigate(['/home']);
  }
}
