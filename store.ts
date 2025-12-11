
import { User, Transaction, Notification } from './types';

const USERS_KEY = 'cashgo_users';
const TRANSACTIONS_KEY = 'cashgo_transactions';
const CURRENT_USER_KEY = 'cashgo_current_user';

export const storage = {
  getUsers: (): User[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },
  saveUser: (user: User) => {
    const users = storage.getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },
  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  },
  setCurrentUser: (user: User | null) => {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  },
  getTransactions: (userId: string): Transaction[] => {
    const data = localStorage.getItem(TRANSACTIONS_KEY);
    const all = data ? JSON.parse(data) : [];
    return all.filter((t: Transaction) => t.userId === userId);
  },
  getAllTransactions: (): Transaction[] => {
    const data = localStorage.getItem(TRANSACTIONS_KEY);
    return data ? JSON.parse(data) : [];
  },
  addTransaction: (transaction: Transaction) => {
    const data = localStorage.getItem(TRANSACTIONS_KEY);
    const all = data ? JSON.parse(data) : [];
    all.unshift(transaction);
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(all));
  },
  updateTransactionStatus: (id: string, status: 'completed' | 'failed') => {
    const data = localStorage.getItem(TRANSACTIONS_KEY);
    if (!data) return;
    const all = JSON.parse(data);
    const updated = all.map((t: Transaction) => t.id === id ? { ...t, status } : t);
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updated));
  },
  getStats: () => {
    const transactions = storage.getAllTransactions();
    const users = storage.getUsers();
    const totalVolume = transactions.reduce((acc, t) => acc + t.amount, 0);
    const pendingCount = transactions.filter(t => t.status === 'pending').length;
    
    return {
      totalVolume,
      transactionCount: transactions.length,
      userCount: users.length,
      pendingCount
    };
  },
  clearAll: () => {
    localStorage.clear();
  }
};
