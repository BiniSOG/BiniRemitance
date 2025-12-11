
export enum TransactionType {
  BANK_TRANSFER = 'BANK_TRANSFER',
  CASH_PICKUP = 'CASH_PICKUP'
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  pin?: string;
  profileImage?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  beneficiaryName: string;
  accountNumber?: string;
  phone?: string;
  bankName?: string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  reason: string;
}

export interface Bank {
  id: string;
  name: string;
  logo: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}
