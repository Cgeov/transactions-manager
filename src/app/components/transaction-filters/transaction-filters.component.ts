import { Component, OnInit, DestroyRef, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { merge } from 'rxjs';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

export interface FilterValues {
  status: string;
  type: string;
  sourceSystem: string;
  searchTerm: string;
  startDate?: string;
  endDate?: string;
}

@Component({
  selector: 'app-transaction-filters',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectModule,
    DatePickerModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './transaction-filters.component.html',
  styleUrl: './transaction-filters.component.css',
})
export class TransactionFiltersComponent implements OnInit {
  filtersChanged = output<FilterValues>();
  filtersCleared = output<void>();

  readonly form = new FormGroup({
    searchTerm: new FormControl<string>('', { nonNullable: true }),
    status: new FormControl<string>('', { nonNullable: true }),
    type: new FormControl<string>('', { nonNullable: true }),
    sourceSystem: new FormControl<string>('', { nonNullable: true }),
    dates: new FormControl<Date[] | null>(null),
  });

  readonly statusOptions = [
    { label: 'Todos los Estados', value: '' },
    { label: 'Pendiente', value: 'pendiente' },
    { label: 'Procesando', value: 'procesando' },
    { label: 'Completada', value: 'completada' },
    { label: 'Fallida', value: 'fallida' },
  ];

  readonly typeOptions = [
    { label: 'Todos los Tipos', value: '' },
    { label: 'Venta', value: 'venta' },
    { label: 'Devolución', value: 'devolución' },
    { label: 'Ajuste Inventario', value: 'ajuste_inventario' },
    { label: 'Transferencia', value: 'transferencia' },
  ];

  readonly sourceOptions = [
    { label: 'Todos los Sistemas', value: '' },
    { label: 'WMS', value: 'WMS' },
    { label: 'Shopify', value: 'Shopify' },
    { label: 'Magento', value: 'Magento' },
    { label: 'SAP', value: 'SAP' },
  ];

  constructor(private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    this.form.controls.searchTerm.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.emitFilters());

    merge(
      this.form.controls.status.valueChanges,
      this.form.controls.type.valueChanges,
      this.form.controls.sourceSystem.valueChanges,
      this.form.controls.dates.valueChanges,
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.emitFilters());
  }

  clearFilters(): void {
    this.form.reset({ searchTerm: '', status: '', type: '', sourceSystem: '', dates: null });
    this.filtersCleared.emit();
  }

  private emitFilters(): void {
    const { searchTerm, status, type, sourceSystem, dates } = this.form.getRawValue();

    let startDate: string | undefined;
    let endDate: string | undefined;

    if (dates && dates.length > 0) {
      if (dates[0]) startDate = dates[0].toISOString();
      if (dates[1]) {
        const end = new Date(dates[1]);
        end.setHours(23, 59, 59, 999);
        endDate = end.toISOString();
      }
    }

    this.filtersChanged.emit({ status, type, sourceSystem, searchTerm, startDate, endDate });
  }
}
