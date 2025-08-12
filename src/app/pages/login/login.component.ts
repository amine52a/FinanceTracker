import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';  // adjust path

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

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService  // add this
  ) {}

  login() {
    this.http.post('http://localhost:5000/api/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        if (res.token && res.role) {
          this.authService.setToken(res.token);
          this.authService.setRole(res.role);
          alert('Login successful!');
          this.router.navigate(['/home']);
        } else {
          alert('Login failed: no token received');
        }
      },
      error: (err) => {
        alert('Invalid credentials');
      }
    });
  }
}
