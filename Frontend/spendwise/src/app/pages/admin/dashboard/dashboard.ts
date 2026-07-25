import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../../shared/components/sidebar/sidebar';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-admin-dashboard',
  imports: [Sidebar, Navbar, NgFor, NgIf, FormsModule, DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class AdminDashboard implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchQuery: string = '';

  get adminCount(): number {
    return this.users.filter(u => u.role === 'admin').length;
  }

  get userCount(): number {
    return this.users.filter(u => u.role === 'user').length;
  }

  constructor(private authService: Auth,private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    
    this.loadUsers();
  }

  loadUsers() {
    this.authService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res.data.users || [];
        this.filteredUsers = [...this.users];
        this.cdr.detectChanges();
      },
      
      error: (err) => {
        console.error('Failed to load users', err);
      }
    });
  }

  applySearch() {
    const q = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(u =>
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q)
    );
  }

  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.authService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error('Failed to delete user', err)
      });
    }
  }
}