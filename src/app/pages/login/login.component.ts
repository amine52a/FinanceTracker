import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    this.http.post('http://localhost:5000/api/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        alert('Login successful!');
        // Optionally save JWT token here if your backend sends one
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert('Invalid credentials');
      }
    });
  }
}
