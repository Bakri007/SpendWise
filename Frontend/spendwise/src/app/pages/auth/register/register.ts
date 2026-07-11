
import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, NgIf],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register  implements AfterViewInit {
  name: string = '';
  email: string = '';
  password: string = '';
  currency: string = 'EGP';
  errorMessage: string = '';
  nameError: string = '';
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

  validateName() {
    if (!this.name) {
      this.nameError = 'Name is required';
    } else if (this.name.length < 2) {
      this.nameError = 'Name must be at least 2 characters';
    } else {
      this.nameError = '';
    }
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

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    this.validateName();
    this.validateEmail();
    this.validatePassword();

    if (this.nameError || this.emailError || this.passwordError) {
      return;
    }

    this.authService.register(this.name, this.email, this.password, this.currency).subscribe({
      next: (response: any) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Registration failed';
      }
    });
  }
}