import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private router: Router, private http: HttpClient) {}

  register() {
    this.errorMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Passwords don't match!";
      return;
    }
    if (!this.email || !this.password) {
      this.errorMessage = "Please fill in all fields";
      return;
    }

    this.http.post('http://localhost:5000/api/register', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        alert('Account created successfully!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = 'Registration failed. Try again.';
      }
    });
  }
}
