import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgFor, NgIf, DecimalPipe, DatePipe } from '@angular/common';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Expense } from '../../core/services/expense';
import { Income } from '../../core/services/income';
import { Budget } from '../../core/services/budget';
import Chart from 'chart.js/auto';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  imports: [Sidebar, Navbar, NgFor, NgIf, DecimalPipe, DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit, AfterViewInit {
  currency: string = 'EGP';
  totalIncome: number = 0;
  totalExpenses: number = 0;
  balance: number = 0;
  budgetPercent: number = 0;
  totalBudget: number = 0;
  recentTransactions: any[] = [];

  constructor(
    private expenseService: Expense,
    private incomeService: Income,
    private budgetService: Budget,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const currency = localStorage.getItem('currency');
    const token = localStorage.getItem('token');
    if (currency) {
      this.currency = currency;
    } else if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.currency = payload.currency || 'EGP';
    }

    this.loadData();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initCharts();
    }, 500);
  }

  loadData() {
    
    this.expenseService.getExpenses().subscribe({
      next: (res: any) => {
        const expenses = res.data.expense || [];
        this.totalExpenses = expenses.reduce((sum: number, e: any) => sum + e.amount, 0);

        
        const expenseTransactions = expenses.slice(0, 5).map((e: any) => ({
          ...e,
          type: 'expense',
          icon: 'arrow-down-circle',
          color: '#EE3E55'
        }));

        this.recentTransactions = [...this.recentTransactions, ...expenseTransactions]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);

        this.balance = this.totalIncome - this.totalExpenses;
        this.cdr.detectChanges();
      }
    });

    
    this.incomeService.getIncomes().subscribe({
      next: (res: any) => {
        const incomes = res.data.income || [];
        this.totalIncome = incomes.reduce((sum: number, i: any) => sum + i.amount, 0);

        const incomeTransactions = incomes.slice(0, 5).map((i: any) => ({
          ...i,
          type: 'income',
          icon: 'arrow-up-circle',
          color: '#2ECC71'
        }));

        this.recentTransactions = [...this.recentTransactions, ...incomeTransactions]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);

        this.balance = this.totalIncome - this.totalExpenses;
        this.cdr.detectChanges();
      }
      
    });

    
    const now = new Date();
    this.budgetService.getBudgets(now.getMonth() + 1, now.getFullYear()).subscribe({
      next: (res: any) => {
        const budgets = res.data.budget || [];
        if (budgets.length > 0) {
          this.totalBudget = budgets[0].total_limit;
          this.budgetPercent = Math.round((this.totalExpenses / this.totalBudget) * 100);
        }
        this.cdr.detectChanges();
      }
    });
  }

  initCharts() {
    
    const barCtx = document.getElementById('barChart') as HTMLCanvasElement;
    if (barCtx) {
      new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Income',
              data: [0, 0, 0, 0, 0, this.totalIncome],
              backgroundColor: '#2ECC71',
              borderRadius: 4,
            },
            {
              label: 'Expenses',
              data: [0, 0, 0, 0, 0, this.totalExpenses],
              backgroundColor: '#EE3E55',
              borderRadius: 4,
            }
          ]
        },
        options: {
          responsive: true,
          plugins: { legend: { labels: { color: '#888' } } },
          scales: {
            x: { ticks: { color: '#888' }, grid: { color: '#2a2a3a' } },
            y: { ticks: { color: '#888' }, grid: { color: '#2a2a3a' } }
          }
        }
      });
    }

    
    const donutCtx = document.getElementById('donutChart') as HTMLCanvasElement;
    if (donutCtx) {
      new Chart(donutCtx, {
        type: 'doughnut',
        data: {
          labels: ['Expenses', 'Remaining'],
          datasets: [{
            data: [this.totalExpenses, Math.max(0, this.totalBudget - this.totalExpenses)],
            backgroundColor: ['#EE3E55', '#6366F1'],
            borderWidth: 0,
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { labels: { color: '#888' } } }
        }
      });
    }
    
  }

}