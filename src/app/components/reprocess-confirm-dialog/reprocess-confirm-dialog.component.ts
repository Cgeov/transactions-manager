import { Component, input, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-reprocess-confirm-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  templateUrl: './reprocess-confirm-dialog.component.html',
  styleUrl: './reprocess-confirm-dialog.component.css',
})
export class ReprocessConfirmDialogComponent {
  transaction = input<Transaction | null>(null);
  visible = model<boolean>(false);
  loading = input<boolean>(false);

  confirmed = output<void>();
  cancelled = output<void>();

  onConfirm(): void {
    this.confirmed.emit();
  }

  onCancel(): void {
    this.visible.set(false);
    this.cancelled.emit();
  }
}
