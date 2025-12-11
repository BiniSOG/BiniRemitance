
import React from 'react';
import { Layout } from '../components/Layout';
import { BottomNav } from '../components/BottomNav';
import { storage } from '../store';
import { Calendar, Building2, HandCoins } from 'lucide-react';
import { TransactionType } from '../types';

export const History: React.FC = () => {
  const user = storage.getCurrentUser();
  const transactions = user ? storage.getTransactions(user.id) : [];

  return (
    <Layout>
      <div className="flex-1 flex flex-col bg-gray-50">
        <div className="bg-white p-6 border-b flex justify-between items-center">
          <h1 className="text-lg font-bold text-[#1a4b7a]">Transactions</h1>
          <button className="p-2 bg-blue-50 text-[#1a4b7a] rounded-lg">
            <Calendar size={18} />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto pb-24">
           <div className="bg-[#1a4b7a] bg-opacity-80 rounded-lg p-4 mb-6 text-white text-[11px] leading-snug">
              Send money to beloved ones in a blink by CashPickUp and Account options.
           </div>

           {transactions.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-20 opacity-60">
               <div className="bg-slate-100 p-10 rounded-3xl mb-4">
                 <span className="text-5xl">📦</span>
               </div>
               <p className="text-gray-400 text-sm">No Transaction Yet</p>
             </div>
           ) : (
             <div className="space-y-4">
               {transactions.map((t) => (
                 <div key={t.id} className="bg-white p-5 rounded-2xl flex items-center justify-between shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[#1a4b7a]">
                        {t.type === TransactionType.BANK_TRANSFER ? <Building2 size={20} /> : <HandCoins size={20} />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{t.beneficiaryName}</p>
                        <p className="text-[10px] text-gray-400 font-medium">
                          {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-bold text-[#1a4b7a]">${t.amount.toFixed(2)}</p>
                       <p className={`text-[9px] font-bold uppercase tracking-widest ${t.status === 'completed' ? 'text-green-500' : 'text-orange-400'}`}>
                         {t.status}
                       </p>
                    </div>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>
      <BottomNav />
    </Layout>
  );
};
