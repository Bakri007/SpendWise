import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit {
  isCollapsed: boolean = false;
  isOpen: boolean = false;  
  userRole: string = '';

  constructor(private authService: Auth, private router: Router) {}

ngOnInit() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userRole = payload.role ? payload.role.toUpperCase() : 'USER';
    } catch (e) {
      this.userRole = 'USER';
    }
  }

  const savedState = localStorage.getItem('sidebarCollapsed');
  if (savedState === 'true') {
    this.isCollapsed = true;
    document.body.classList.add('sidebar-collapsed');
  } else {
    this.isCollapsed = false;
    document.body.classList.remove('sidebar-collapsed');
  }
}

  get isMobile(): boolean {
  return window.innerWidth <= 768;
}

toggle() {
    if (this.isMobile) {
      this.isOpen = !this.isOpen;
    } else {
      this.isCollapsed = !this.isCollapsed;
      document.body.classList.toggle('sidebar-collapsed', this.isCollapsed);
      
     
      localStorage.setItem('sidebarCollapsed', String(this.isCollapsed));
      
      setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
    }
  }

closeSidebar() {
  this.isOpen = false;
}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}