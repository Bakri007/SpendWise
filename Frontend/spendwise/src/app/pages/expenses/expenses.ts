import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, DecimalPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Expense } from '../../core/services/expense';
import { Category } from '../../core/services/category';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-expenses',
  imports: [Sidebar, Navbar, NgFor, NgIf, FormsModule, DecimalPipe, DatePipe],
  templateUrl: './expenses.html',
  styleUrl: './expenses.scss',
})
export class Expenses implements OnInit {
  currency: string = 'EGP';
  expenses: any[] = [];
  categories: any[] = [];
  filterPayment: string = '';
  showModal: boolean = false;
  editMode: boolean = false;
  errorMessage: string = '';
  editId: string = '';

  form = {
    description: '',
    amount: 0,
    date: '',
    payment_method: 'cash',
    category_id: ''
  };

  constructor(
    private expenseService: Expense,
    private categoryService: Category,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const currency = localStorage.getItem('currency');
    if (currency) this.currency = currency;
    this.loadExpenses();
    this.loadCategories();
  }

 loadExpenses() {
  this.expenseService.getExpenses().subscribe({
    next: (res: any) => {
      let expenses = res.data.expense || [];
      
      
      if (this.filterPayment) {
        expenses = expenses.filter((e: any) => e.payment_method === this.filterPayment);
      }
      
      this.expenses = expenses;
      this.cdr.detectChanges();
    }
    
  });
}
getCategoryName(catId: any): string {
  if (!catId) return '—';
  // لو كان أوبجكت كامل جاي من الباك إند
  if (typeof catId === 'object' && catId.name) return catId.name;
  // لو جاي مجرد ID وبندور عليه في مصفوفة الـ categories
  const found = this.categories.find(c => c._id === catId);
  return found ? found.name : '—';
  
}

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = (res.data.category || []).filter((c: any) => c.type === 'expense');
        this.cdr.detectChanges();
      }
    });
  }

  applyFilter() {
    this.loadExpenses();
  }

  openModal() {
    this.editMode = false;
    this.editId = '';
    this.form = { description: '', amount: 0, date: '', payment_method: 'cash', category_id: '' };
    this.errorMessage = '';
    this.showModal = true;
  }

  editExpense(expense: any) {
    this.editMode = true;
    this.editId = expense._id;
    this.form = {
      description: expense.description,
      amount: expense.amount,
      date: expense.date?.substring(0, 10),
      payment_method: expense.payment_method,
      category_id: expense.category_id?._id || expense.category_id
    };
    this.errorMessage = '';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
     if (!this.form.description) {
    this.errorMessage = 'Description is required';
    return;
  }
  if (!this.form.amount || this.form.amount <= 0) {
    this.errorMessage = 'Please enter a valid amount';
    return;
  }
  if (!this.form.date) {
    this.errorMessage = 'Date is required';
    return;
  }
  if (!this.form.category_id) {
    this.errorMessage = 'Please select a category';
    return;
  }

    if (this.editMode) {
      this.expenseService.updateExpense(
        this.editId,
        this.form.amount,
        this.form.description,
        new Date(this.form.date),
        this.form.payment_method,
        this.form.category_id
      ).subscribe({
        next: () => {
          this.closeModal();
          this.loadExpenses();
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Failed to update';
        }
      });
    } else {
      this.expenseService.createExpense(
        this.form.amount,
        this.form.description,
        new Date(this.form.date),
        this.form.payment_method,
        this.form.category_id
      ).subscribe({
        next: () => {
          this.closeModal();
          this.loadExpenses();
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Failed to add expense';
        }
      });
    }
  }

  deleteExpense(id: string) {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenseService.deleteExpense(id).subscribe({
        next: () => this.loadExpenses()
      });
    }
  }
}