import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements AfterViewInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  emailError: string = '';
  passwordError: string = '';
  showPassword: boolean = false;

  constructor(
    private authService: Auth,
    private router: Router,
    private el: ElementRef
  ) {}

  ngAfterViewInit() {
    this.generateDots();
  }

  generateDots() {
    const container = this.el.nativeElement.querySelector('#dotsBg');
    for (let i = 0; i < 25; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      dot.style.left = Math.random() * 100 + '%';
      dot.style.top = Math.random() * 100 + '%';
      dot.style.animationDelay = (Math.random() * 3).toFixed(2) + 's';
      container.appendChild(dot);
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email) {
      this.emailError = 'Email is required';
    } else if (!emailRegex.test(this.email)) {
      this.emailError = 'Please enter a valid email';
    } else {
      this.emailError = '';
    }
  }

  validatePassword() {
    if (!this.password) {
      this.passwordError = 'Password is required';
    } else if (this.password.length < 8) {
      this.passwordError = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(this.password)) {
      this.passwordError = 'Must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(this.password)) {
      this.passwordError = 'Must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(this.password)) {
      this.passwordError = 'Must contain at least one number';
    } else if (!/\W/.test(this.password)) {
      this.passwordError = 'Must contain at least one special character';
    } else {
      this.passwordError = '';
    }
  }
  
  goToRegister() {
  this.router.navigate(['/register']);
}
goToForgotPassword() {
  this.router.navigate(['/forgot-password']);
}

  onSubmit() {
  this.validateEmail();
  this.validatePassword();

  if (this.emailError || this.passwordError) {
    return;
  }

  this.authService.login(this.email, this.password).subscribe({
    next: (response: any) => {
      const token = response.data.token;
      localStorage.setItem('token', token);

      // فك شفرة التوكن لقراءة الـ Role
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userRole = payload.role ? payload.role.toUpperCase() : 'USER';

      // التوجيه بناءً على الـ Role
      if (userRole === 'ADMIN') {
        this.router.navigate(['/admin/dashboard']); // غير '/admin' لمسار صفحة الأدمن عندك
      } else {
        this.router.navigate(['/dashboard']);
      }
    },
    error: (err) => {
      this.errorMessage = err.error.message || 'Login failed';
    }
  });
}
}