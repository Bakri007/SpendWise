import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, DecimalPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Income } from '../../core/services/income';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-income',
  imports: [Sidebar, Navbar, NgFor, NgIf, FormsModule, DecimalPipe, DatePipe],
  templateUrl: './income.html',
  styleUrl: './income.scss',
})
export class IncomeComponent implements OnInit {
  currency: string = 'EGP';
  incomes: any[] = [];
  showModal: boolean = false;
  editMode: boolean = false;
  errorMessage: string = '';
  editId: string = '';

  form = {
    description: '',
    amount: 0,
    date: '',
    source: 'salary',
    
  };

  constructor(
    private incomeService: Income,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const currency = localStorage.getItem('currency');
    if (currency) this.currency = currency;
    this.loadIncomes();
  }

  loadIncomes() {
    this.incomeService.getIncomes().subscribe({
      next: (res: any) => {
        this.incomes = res.data.income || [];
        this.cdr.detectChanges();
      }
    });
  }


  openModal() {
    this.editMode = false;
    this.editId = '';
    this.form = { description: '', amount: 0, date: '', source: 'salary'};
    this.errorMessage = '';
    this.showModal = true;
  }

  editIncome(income: any) {
    this.editMode = true;
    this.editId = income._id;
    this.form = {
      description: income.description,
      amount: income.amount,
      date: income.date?.substring(0, 10),
      source: income.source,
    };
    this.errorMessage = '';
    this.showModal = true;
  }

  closeModal() { this.showModal = false; }

  onSubmit() {
    if (!this.form.description) { this.errorMessage = 'Description is required'; return; }
    if (!this.form.amount || this.form.amount <= 0) { this.errorMessage = 'Please enter a valid amount'; return; }
    if (!this.form.date) { this.errorMessage = 'Date is required'; return; }

  
    if (this.editMode) {
      this.incomeService.updateIncome(
        this.editId, this.form.amount, this.form.description,
        new Date(this.form.date), this.form.source, null
      ).subscribe({
        next: () => { this.closeModal(); this.loadIncomes(); },
        error: (err) => { this.errorMessage = err.error.message || 'Failed to update'; }
      });
    } else {
      this.incomeService.createIncome(
        this.form.amount, this.form.description,
        new Date(this.form.date), this.form.source, null
      ).subscribe({
        next: () => { this.closeModal(); this.loadIncomes(); },
        error: (err) => { this.errorMessage = err.error.message || 'Failed to add income'; }
      });
    }
  }

  deleteIncome(id: string) {
    if (confirm('Are you sure?')) {
      this.incomeService.deleteIncome(id).subscribe({
        next: () => this.loadIncomes()
      });
    }
  }
}