import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly apiUrl = 'http://localhost:3001/transactions';

  constructor(private http: HttpClient) {}

  getAll(filters?: {
    status?: string;
    type?: string;
    sourceSystem?: string;
    searchTerm?: string;
    startDate?: string;
    endDate?: string;
  }): Observable<Transaction[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.status) {
        params = params.set('status', filters.status);
      }
      if (filters.type) {
        params = params.set('type', filters.type);
      }
      if (filters.sourceSystem) {
        params = params.set('sourceSystem', filters.sourceSystem);
      }
      if (filters.searchTerm) {
        params = params.set('externalId_like', filters.searchTerm);
      }
      if (filters.startDate) {
        params = params.set('receivedAt_gte', filters.startDate);
      }
      if (filters.endDate) {
        params = params.set('receivedAt_lte', filters.endDate);
      }
    }

    return this.http.get<Transaction[]>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`);
  }

  reprocess(id: number): Observable<Transaction> {
    return this.http.patch<Transaction>(`${this.apiUrl}/${id}`, {
      status: 'procesando',
      updatedAt: new Date().toISOString(),
    });
  }
}
