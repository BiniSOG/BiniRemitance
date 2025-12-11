
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, CreditCard, Clock, CheckCircle, RefreshCcw, DollarSign, Search } from 'lucide-react';
import { storage } from '../store';
import { Transaction } from '../types';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(storage.getStats());
  const [transactions, setTransactions] = useState<Transaction[]>(storage.getAllTransactions());
  const [filter, setFilter] = useState('');

  const refreshData = () => {
    setStats(storage.getStats());
    setTransactions(storage.getAllTransactions());
  };

  const handleSettle = (id: string) => {
    storage.updateTransactionStatus(id, 'completed');
    refreshData();
  };

  const filteredTransactions = transactions.filter(t => 
    t.beneficiaryName.toLowerCase().includes(filter.toLowerCase()) ||
    t.bankName?.toLowerCase().includes(filter.toLowerCase()) ||
    t.id.includes(filter)
  );

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto">
      {/* Admin Header */}
      <div className="bg-[#1a4b7a] text-white p-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80">
            <ArrowLeft size={20} />
            <span className="font-medium">Back to App</span>
          </button>
          <div className="flex items-center gap-4">
             <button onClick={refreshData} className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                <RefreshCcw size={18} />
             </button>
             <h2 className="font-bold">ADMIN CONSOLE</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
            <p className="text-[10px] uppercase font-bold text-blue-200 mb-1">Total Volume</p>
            <div className="flex items-center gap-1">
              <DollarSign size={16} />
              <span className="text-xl font-bold">{stats.totalVolume.toLocaleString()}</span>
            </div>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
            <p className="text-[10px] uppercase font-bold text-blue-200 mb-1">Users</p>
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span className="text-xl font-bold">{stats.userCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 -mt-10 pb-10 space-y-6">
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-start mb-2">
                    <div className="p-2 bg-amber-50 rounded-lg text-amber-500">
                        <Clock size={16} />
                    </div>
                </div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Pending</p>
                <p className="text-xl font-bold text-slate-700">{stats.pendingCount}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-start mb-2">
                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-500">
                        <CheckCircle size={16} />
                    </div>
                </div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Processed</p>
                <p className="text-xl font-bold text-slate-700">{stats.transactionCount - stats.pendingCount}</p>
            </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 border-b border-slate-50 flex items-center justify-between">
                <h3 className="font-bold text-[#1a4b7a] text-sm">TRANSACTION MONITOR</h3>
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                    <input 
                      type="text" 
                      placeholder="Search..."
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="bg-slate-50 border-none rounded-full py-1.5 pl-8 pr-4 text-xs focus:ring-1 focus:ring-blue-200 outline-none w-32"
                    />
                </div>
            </div>
            
            <div className="divide-y divide-slate-50">
                {filteredTransactions.length === 0 ? (
                    <div className="p-10 text-center opacity-30">
                        <p className="text-xs">No records found</p>
                    </div>
                ) : (
                    filteredTransactions.map((t) => (
                        <div key={t.id} className="p-4 hover:bg-slate-50 transition-colors">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <p className="text-xs font-black text-slate-700">{t.beneficiaryName}</p>
                                    <p className="text-[9px] text-slate-400">{t.bankName || 'Cash Pick-up'}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-[#1a4b7a]">${t.amount}</p>
                                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                        t.status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                                    }`}>
                                        {t.status}
                                    </span>
                                </div>
                            </div>
                            
                            {t.status === 'pending' && (
                                <div className="flex gap-2">
                                    <button 
                                      onClick={() => handleSettle(t.id)}
                                      className="flex-1 bg-[#1a4b7a] text-white text-[10px] font-bold py-2 rounded-lg hover:bg-blue-800 transition-colors"
                                    >
                                        SETTLE NOW
                                    </button>
                                    <button 
                                      className="px-3 border border-slate-200 text-slate-400 text-[10px] rounded-lg hover:bg-slate-100"
                                    >
                                        DETAILS
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
