import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Category } from '../../core/services/category';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [Sidebar, Navbar, NgFor, NgIf, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories implements OnInit {
  categories: any[] = [];
  activeTab: string = 'expense';
  showModal: boolean = false;
  editMode: boolean = false;
  errorMessage: string = '';
  editId: string = '';

  // الـ type هيفضل دايماً expense
  form = { name: '', icon: '📦', color: '#6366F1', type: 'expense' };

  get filteredCategories() {
    return this.categories.filter(c => c.type === 'expense');
  }

  constructor(private categoryService: Category, private cdr: ChangeDetectorRef) {}

  ngOnInit() { this.loadCategories(); }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res: any) => { 
        this.categories = res.data.category || []; 
        this.cdr.detectChanges();
      }
    });
  }

  // تم الإبقاء عليها كـ Fallback لو مستخدمة داخلياً أو يمكنك حذفها تماماً
  setTab(tab: string) { this.activeTab = tab; }

  openModal() {
    this.editMode = false;
    this.editId = '';
    this.form = { name: '', icon: '📦', color: '#6366F1', type: 'expense' };
    this.errorMessage = '';
    this.showModal = true;
  }

  editCategory(cat: any) {
    this.editMode = true;
    this.editId = cat._id;
    this.form = { name: cat.name, icon: cat.icon, color: cat.color, type: 'expense' };
    this.errorMessage = '';
    this.showModal = true;
  }

  closeModal() { this.showModal = false; }

  onSubmit() {
    if (!this.form.name) { this.errorMessage = 'Name is required'; return; }

    if (this.editMode) {
      this.categoryService.updateCategory(
        this.editId, this.form.name, this.form.icon, this.form.color, this.form.type
      ).subscribe({
        next: () => { this.closeModal(); this.loadCategories(); },
        error: (err) => { this.errorMessage = err.error.message || 'Failed to update'; }
      });
    } else {
      this.categoryService.createCategory(
        this.form.name, this.form.icon, this.form.color, this.form.type
      ).subscribe({
        next: () => { this.closeModal(); this.loadCategories(); },
        error: (err) => { this.errorMessage = err.error.message || 'Failed to add category'; }
      });
    }
  }

  deleteCategory(id: string) {
    if (confirm('Are you sure?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => this.loadCategories()
      });
    }
  }
}