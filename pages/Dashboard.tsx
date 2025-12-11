
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { BottomNav } from '../components/BottomNav';
import { storage } from '../store';
import { Building2, HandCoins } from 'lucide-react';
import { TransactionType } from '../types';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = storage.getCurrentUser();
  const transactions = user ? storage.getTransactions(user.id) : [];

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <Layout>
      <div className="flex-1 overflow-y-auto bg-gray-50 pb-20">
        {/* Header */}
        <div className="p-6 bg-white border-b flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-[#1a4b7a]">
              {user.firstName} {user.lastName},
            </h2>
            <p className="text-gray-500 text-xs">Good Evening</p>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200">
             <img src={`https://picsum.photos/seed/${user.id}/100/100`} alt="Profile" />
          </div>
        </div>

        <div className="p-6">
          <div className="bg-[#1a4b7a] bg-opacity-80 rounded-lg p-4 mb-8 text-white">
            <p className="text-xs leading-relaxed">
              Send money to beloved ones in a blink by CashPickUp and Account options.
            </p>
          </div>

          <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">
            Choose Money Transfer
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/transfer/bank')}
              className="bg-white border-2 border-gray-100 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 shadow-sm active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[#1a4b7a]">
                <Building2 size={24} />
              </div>
              <span className="text-xs font-bold text-gray-600">Bank Transfer</span>
            </button>

            <button
              onClick={() => navigate('/transfer/cash')}
              className="bg-white border-2 border-gray-100 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 shadow-sm active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[#1a4b7a]">
                <HandCoins size={24} />
              </div>
              <span className="text-xs font-bold text-gray-600">CashPickUp</span>
            </button>
          </div>

          <div className="mt-10">
            <h3 className="text-sm font-bold text-gray-800 mb-6 uppercase tracking-wider">
              Recent Transactions
            </h3>

            {transactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 opacity-60">
                <div className="bg-slate-100 p-8 rounded-full mb-4">
                  <span className="text-4xl">💼</span>
                </div>
                <p className="text-gray-400 text-sm font-medium">No Transaction Yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.slice(0, 5).map((t) => (
                  <div key={t.id} className="bg-white p-4 rounded-xl flex items-center justify-between shadow-sm border border-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-[#1a4b7a]">
                        {t.type === TransactionType.BANK_TRANSFER ? <Building2 size={18} /> : <HandCoins size={18} />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{t.beneficiaryName}</p>
                        <p className="text-[10px] text-gray-400">{new Date(t.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-[#1a4b7a]">${t.amount.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomNav />
    </Layout>
  );
};
