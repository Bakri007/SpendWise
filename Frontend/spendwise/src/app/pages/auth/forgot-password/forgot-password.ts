import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword implements AfterViewInit {
  step: number = 1;
  email: string = '';
  otpDigits: string[] = ['', '', '', '', '', ''];
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  emailError: string = '';
  newPasswordError: string = '';
  confirmPasswordError: string = '';
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

  validateNewPassword() {
    if (!this.newPassword) {
      this.newPasswordError = 'Password is required';
    } else if (this.newPassword.length < 8) {
      this.newPasswordError = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(this.newPassword)) {
      this.newPasswordError = 'Must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(this.newPassword)) {
      this.newPasswordError = 'Must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(this.newPassword)) {
      this.newPasswordError = 'Must contain at least one number';
    } else if (!/\W/.test(this.newPassword)) {
      this.newPasswordError = 'Must contain at least one special character';
    } else {
      this.newPasswordError = '';
    }
  }

  validateConfirmPassword() {
    if (!this.confirmPassword) {
      this.confirmPasswordError = 'Please confirm your password';
    } else if (this.confirmPassword !== this.newPassword) {
      this.confirmPasswordError = 'Passwords do not match';
    } else {
      this.confirmPasswordError = '';
    }
  }

  onOtpInput(event: any, index: number) {
    const value = event.target.value;
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) (next as HTMLInputElement).focus();
    }
  }

  onOtpKeydown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.otpDigits[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      if (prev) (prev as HTMLInputElement).focus();
    }
  }

  sendCode() {
    this.validateEmail();
    if (this.emailError) return;

    this.authService.forgotPassword(this.email).subscribe({
      next: () => {
        this.errorMessage = '';
        this.step = 2;
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Failed to send code';
      }
    });
  }

  verifyCode() {
    const code = this.otpDigits.join('');
    if (code.length < 6) {
      this.errorMessage = 'Please enter the complete 6-digit code';
      return;
    }

    this.authService.verifyResetCode(this.email, code).subscribe({
      next: () => {
        this.errorMessage = '';
        this.step = 3;
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Invalid code';
      }
    });
  }

  resetPassword() {
    this.validateNewPassword();
    this.validateConfirmPassword();
    if (this.newPasswordError || this.confirmPasswordError) return;

    const code = this.otpDigits.join('');

    this.authService.resetPassword(this.email, code, this.newPassword).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Failed to reset password';
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}