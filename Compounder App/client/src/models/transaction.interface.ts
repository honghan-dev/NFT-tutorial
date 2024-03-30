type TransactionAction = 'buy' | 'sell'

/**
 * Interface for single Transaction
 */
export interface Transaction {
  createdBy: string;
  createdAt: Date;
  action: TransactionAction;
  symbol: string;
  unit: number;
  price: number;
  investedRM: number;
  investedUSD: number;
  rate: number;
  transactionDate: Date;
}
