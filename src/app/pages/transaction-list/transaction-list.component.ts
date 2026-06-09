import { Component, OnInit, signal, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Transaction, TransactionEvent, TransactionStatus } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction.service';
import { TransactionDetailComponent } from '../../components/transaction-detail/transaction-detail.component';
import { TransactionFiltersComponent, FilterValues } from '../../components/transaction-filters/transaction-filters.component';
import { ReprocessConfirmDialogComponent } from '../../components/reprocess-confirm-dialog/reprocess-confirm-dialog.component';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    ButtonModule,
    TooltipModule,
    SkeletonModule,
    ToastModule,
    TransactionDetailComponent,
    TransactionFiltersComponent,
    ReprocessConfirmDialogComponent,
  ],
  providers: [MessageService],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css',
})
export class TransactionListComponent implements OnInit {
  transactions = signal<Transaction[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  selectedTransaction = signal<Transaction | null>(null);
  displayDetailDialog = signal(false);
  reprocessingId = signal<number | null>(null);
  reprocessTarget = signal<Transaction | null>(null);
  showReprocessDialog = signal(false);
  readonly dummyRows: any[] = Array(8).fill({});

  activeFilters = signal<FilterValues | null>(null);

  constructor(
    private transactionService: TransactionService,
    private messageService: MessageService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.loading.set(true);
    this.error.set(null);

    const filters = this.activeFilters();
    const params: Record<string, string> = {};
    if (filters) {
      if (filters.status)       params['status']       = filters.status;
      if (filters.type)         params['type']         = filters.type;
      if (filters.sourceSystem) params['sourceSystem'] = filters.sourceSystem;
      if (filters.searchTerm)   params['searchTerm']   = filters.searchTerm;
      if (filters.startDate)    params['startDate']    = filters.startDate;
      if (filters.endDate)      params['endDate']      = filters.endDate;
    }

    this.transactionService.getAll(params)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.transactions.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('No se pudieron cargar las transacciones. Verifica que el servidor esté activo.');
          this.loading.set(false);
          console.error('Error loading transactions:', err);
        },
      });
  }

  onFiltersChanged(filters: FilterValues): void {
    this.activeFilters.set(filters);
    this.loadTransactions();
  }

  onFiltersCleared(): void {
    this.activeFilters.set(null);
    this.loadTransactions();
  }

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

  onViewDetail(transaction: Transaction): void {
    this.selectedTransaction.set(transaction);
    this.displayDetailDialog.set(true);
  }

  onReprocess(transaction: Transaction): void {
    if (this.reprocessingId() !== null) return;
    this.reprocessTarget.set(transaction);
    this.showReprocessDialog.set(true);
  }

  onReprocessConfirmed(): void {
    const tx = this.reprocessTarget();
    if (tx) {
      this.executeReprocess(tx);
    }
  }

  onReprocessCancelled(): void {
    this.reprocessTarget.set(null);
  }

  private executeReprocess(transaction: Transaction): void {
    this.showReprocessDialog.set(false);
    this.reprocessingId.set(transaction.id);

    this.transactionService.reprocess(transaction.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (updatedTx) => {
          const reprocessEvent: TransactionEvent = {
            timestamp: new Date().toISOString(),
            action: 'reproceso',
            detail: `Reproceso solicitado manualmente. Nuevo estado: ${updatedTx.status ?? 'procesando'}.`,
          };

          const applyEvent = (tx: Transaction): Transaction => ({
            ...tx,
            ...updatedTx,
            events: [...(tx.events ?? []), reprocessEvent],
          });

          this.transactions.update(txs =>
            txs.map(t => t.id === transaction.id ? applyEvent(t) : t)
          );

          const currentSelected = this.selectedTransaction();
          if (currentSelected && currentSelected.id === transaction.id) {
            this.selectedTransaction.set(applyEvent(currentSelected));
          }

          this.messageService.add({
            severity: 'success',
            summary: 'Reproceso Enviado',
            detail: `La transacción ${transaction.externalId} se ha enviado a reprocesar.`,
            life: 4000,
          });

          this.reprocessingId.set(null);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error de Reproceso',
            detail: `No se pudo reprocesar la transacción: ${err.message || 'Error del servidor'}`,
            life: 5000,
          });

          this.reprocessingId.set(null);
          console.error('Error reprocessing transaction:', err);
        },
      });
  }
}
