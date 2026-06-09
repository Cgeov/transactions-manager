export interface TransactionEvent {
  timestamp: string;
  action: string;
  detail: string;
}

export interface Transaction {
  id: number;
  externalId: string;
  type: string;
  sourceSystem: string;
  status: TransactionStatus;
  receivedAt: string;
  updatedAt: string;
  payload: Record<string, unknown>;
  errorMessage: string | null;
  events: TransactionEvent[];
}

export type TransactionStatus = 'completada' | 'fallida' | 'pendiente' | 'procesando';
