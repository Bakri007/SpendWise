import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-profile',
  imports: [Sidebar, Navbar, NgIf, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  userName: string = '';
  userEmail: string = '';
  userRole: string = '';
  userInitial: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  showNewPassword: boolean = false;   
  showConfirmPassword: boolean = false;

  constructor(private authService: Auth) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userEmail = payload.email || '';
      this.userRole = payload.role || 'user';
      this.userName = payload.name || 'User';
      this.userInitial = this.userName.charAt(0).toUpperCase();
    }
    
    
  }

  toggleNewPassword() {
  this.showNewPassword = !this.showNewPassword;
}

toggleConfirmPassword() {
  this.showConfirmPassword = !this.showConfirmPassword;
}
changePassword() {
  this.errorMessage = '';
  this.successMessage = '';

  if (!this.newPassword) { 
    this.errorMessage = 'Password is required'; 
    return; 
  }
  if (this.newPassword.length < 8) { 
    this.errorMessage = 'Password must be at least 8 characters'; 
    return; 
  }
  if (!/[A-Z]/.test(this.newPassword)) { 
    this.errorMessage = 'Must contain at least one uppercase letter'; 
    return; 
  }
  if (!/[a-z]/.test(this.newPassword)) { 
    this.errorMessage = 'Must contain at least one lowercase letter'; 
    return; 
  }
  if (!/[0-9]/.test(this.newPassword)) { 
    this.errorMessage = 'Must contain at least one number'; 
    return; 
  }
  if (!/\W/.test(this.newPassword)) { 
    this.errorMessage = 'Must contain at least one special character'; 
    return; 
  }
  if (this.newPassword !== this.confirmPassword) { 
    this.errorMessage = 'Passwords do not match'; 
    return; 
  }

  this.authService.changePassword(this.userEmail, this.newPassword).subscribe({
    next: () => {
      this.successMessage = 'Password updated successfully';
      this.newPassword = '';
      this.confirmPassword = '';
    },
    error: (err) => {
      this.errorMessage = err.error.message || 'Failed to update password';
    }
  });
}
  
}