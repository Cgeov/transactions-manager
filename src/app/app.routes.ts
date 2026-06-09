import { Routes } from '@angular/router';
import { TransactionListComponent } from './pages/transaction-list/transaction-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'transactions',
    pathMatch: 'full',
  },
  {
    path: 'transactions',
    component: TransactionListComponent,
  },
];
