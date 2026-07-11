import { Component, OnInit } from '@angular/core';
import { NgIf, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Budget } from '../../core/services/budget';
import { Expense } from '../../core/services/expense';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-budget',
  imports: [Sidebar, Navbar, NgIf, FormsModule, DecimalPipe],
  templateUrl: './budget.html',
  styleUrl: './budget.scss',
})
export class BudgetComponent implements OnInit {
  currency: string = 'EGP';
  budget: any = null;
  totalSpent: number = 0;
  showModal: boolean = false;
  errorMessage: string = '';
  currentMonth: string = '';

  form = { total_limit: 0 };

  get spentPercent(): number {
    if (!this.budget || this.budget.total_limit === 0) return 0;
    return Math.round((this.totalSpent / this.budget.total_limit) * 100);
  }

  constructor(
    private budgetService: Budget,
    private expenseService: Expense,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const currency = localStorage.getItem('currency');
    if (currency) this.currency = currency;

    const now = new Date();
    this.currentMonth = now.toLocaleString('default', { month: 'long', year: 'numeric' });

    this.loadBudget();
    this.loadExpenses();
  }

  loadBudget() {
    const now = new Date();
    this.budgetService.getBudgets(now.getMonth() + 1, now.getFullYear()).subscribe({
      next: (res: any) => {
        const budgets = res.data.budget || [];
        this.budget = budgets.length > 0 ? budgets[0] : null;
        this.cdr.detectChanges();
      }
    });
  }

  loadExpenses() {
    this.expenseService.getExpenses().subscribe({
      next: (res: any) => {
        const expenses = res.data.expense || [];
        const now = new Date();
        const thisMonth = expenses.filter((e: any) => {
          const d = new Date(e.date);
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        });
        this.totalSpent = thisMonth.reduce((sum: number, e: any) => sum + e.amount, 0);
        this.cdr.detectChanges();
      }
    });
  }

  openModal() {
    this.form.total_limit = this.budget?.total_limit || 0;
    this.errorMessage = '';
    this.showModal = true;
  }

  closeModal() { this.showModal = false; }

  onSubmit() {
    if (!this.form.total_limit || this.form.total_limit <= 0) {
      this.errorMessage = 'Please enter a valid amount';
      return;
    }

    const now = new Date();

    if (this.budget) {
      this.budgetService.updateBudget(
        this.budget._id, now.getMonth() + 1, now.getFullYear(),
        this.form.total_limit, this.budget.category_limits || []
      ).subscribe({
        next: () => { this.closeModal(); this.loadBudget(); },
        error: (err) => { this.errorMessage = err.error.message || 'Failed to update'; }
      });
    } else {
      this.budgetService.createBudget(
        now.getMonth() + 1, now.getFullYear(), this.form.total_limit, []
      ).subscribe({
        next: () => { this.closeModal(); this.loadBudget(); },
        error: (err) => { this.errorMessage = err.error.message || 'Failed to set budget'; }
      });
    }
  }
}