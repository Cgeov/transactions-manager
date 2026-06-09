import { Component, input, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Transaction, TransactionStatus } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-detail',
  standalone: true,
  imports: [CommonModule, DialogModule, TagModule, ButtonModule],
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.css',
})
export class TransactionDetailComponent {
  transaction = input<Transaction | null>(null);
  visible = model<boolean>(false);
  reprocessing = input<boolean>(false);

  reprocess = output<{ transaction: Transaction; event: Event }>();

  getStatusSeverity(status: TransactionStatus): 'success' | 'danger' | 'warn' | 'info' | 'secondary' | 'contrast' {
    const map: Record<TransactionStatus, 'success' | 'danger' | 'warn' | 'info'> = {
      completada: 'success',
      fallida: 'danger',
      pendiente: 'warn',
      procesando: 'info',
    };
    return map[status] ?? 'info';
  }

  getStatusIcon(status: TransactionStatus): string {
    const map: Record<TransactionStatus, string> = {
      completada: 'pi pi-check-circle',
      fallida: 'pi pi-times-circle',
      pendiente: 'pi pi-clock',
      procesando: 'pi pi-spin pi-spinner',
    };
    return map[status] ?? 'pi pi-circle';
  }

  getTypeLabel(type: string): string {
    const map: Record<string, string> = {
      venta: 'Venta',
      devolución: 'Devolución',
      ajuste_inventario: 'Ajuste Inventario',
      transferencia: 'Transferencia',
    };
    return map[type] ?? type;
  }

  onReprocessClick(tx: Transaction, event: Event): void {
    this.reprocess.emit({ transaction: tx, event });
  }
}
