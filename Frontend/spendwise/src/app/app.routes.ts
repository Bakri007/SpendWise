import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { Expenses } from './pages/expenses/expenses';
import { Income} from './pages/income/income';
import { Budget} from './pages/budget/budget';
import { Categories } from './pages/categories/categories';
import { Profile } from './pages/profile/profile';
import { Dashboard as AdminDashboardComponent } from './pages/admin/dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';


export const routes: Routes = [
    {path: '', redirectTo: 'login',pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register},
    {path: 'dashboard', component: Dashboard, canActivate: [authGuard]},
    { path: 'expenses', component: Expenses, canActivate: [authGuard] },
    { path: 'income', component: Income, canActivate: [authGuard] },
    { path: 'budget', component: Budget, canActivate: [authGuard] },
    { path: 'categories', component: Categories, canActivate: [authGuard] },
    { path: 'profile', component: Profile, canActivate: [authGuard] },
    { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [authGuard, adminGuard] },
    { path: '**', redirectTo: 'login' },
];
