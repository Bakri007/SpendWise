import { Component, Input, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  imports: [NgIf, NgFor],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  @Input() title: string = 'Dashboard';
  currency: string = 'EGP';
  showCurrencyMenu: boolean = false;
  currencies: string[] = ['EGP', 'USD', 'EUR', 'GBP', 'SAR'];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency) { this.currency = savedCurrency; return; }
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.currency = payload.currency || 'EGP';
    }
  }

  @Input() sidebarRef: any;

openSidebar() {
  if (this.sidebarRef) {
    this.sidebarRef.toggle();
  }
}

  toggleCurrencyMenu() { this.showCurrencyMenu = !this.showCurrencyMenu; }

  changeCurrency(newCurrency: string) {
    this.currency = newCurrency;
    this.showCurrencyMenu = false;
    localStorage.setItem('currency', newCurrency);
    this.http.patch('http://localhost:3000/api/auth/currency', { currency: newCurrency }).subscribe();
  }
}