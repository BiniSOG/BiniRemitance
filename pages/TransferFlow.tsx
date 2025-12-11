
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, CreditCard } from 'lucide-react';
import { MOCK_BANKS, EXCHANGE_RATE, COLORS } from '../constants';
import { storage } from '../store';
import { TransactionType } from '../types';

export const TransferFlow: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    amount: '',
    accountNumber: '',
    beneficiaryName: '',
    phone: '',
    reason: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => step > 1 ? setStep(step - 1) : navigate('/');

  const handleConfirm = () => {
    const user = storage.getCurrentUser();
    if (!user) return;

    const transaction = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      type: type === 'bank' ? TransactionType.BANK_TRANSFER : TransactionType.CASH_PICKUP,
      amount: parseFloat(formData.amount),
      currency: 'USD',
      beneficiaryName: formData.beneficiaryName,
      accountNumber: formData.accountNumber,
      phone: formData.phone,
      bankName: MOCK_BANKS.find(b => b.id === selectedBank)?.name,
      status: 'pending' as const, // Default to pending for admin settlement
      date: new Date().toISOString(),
      reason: formData.reason,
    };

    storage.addTransaction(transaction);
    setIsSuccess(true);
    setTimeout(() => {
        navigate('/');
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="flex-1 bg-[#1a4b7a] flex flex-col items-center justify-center text-white px-10 text-center">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6">
           <Check size={48} color={COLORS.primary} strokeWidth={4} />
        </div>
        <h2 className="text-2xl font-bold mb-2">Transfer Initiated!</h2>
        <p className="text-blue-100 opacity-80 text-sm">
          Your transfer to {formData.beneficiaryName} is being processed. You can track the status in History.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="px-6 py-4 flex items-center justify-between border-b">
        <button onClick={handleBack} className="text-[#1a4b7a]">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-md font-bold text-[#1a4b7a]">
          {step === 1 ? 'Choose Bank' : step === 2 ? 'Send Money' : step === 3 ? 'Confirm' : 'Payment'}
        </h1>
        <div className="w-5"></div>
      </div>

      <div className="flex-1 overflow-y-auto pb-10">
        {step === 1 && (
          <div className="p-6 grid grid-cols-2 gap-4">
            {MOCK_BANKS.map((bank) => (
              <button
                key={bank.id}
                onClick={() => { setSelectedBank(bank.id); handleNext(); }}
                className="bg-white border rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:border-[#1a4b7a] transition-all"
              >
                <img src={bank.logo} alt={bank.name} className="w-16 h-16 object-contain" />
                <span className="text-[10px] font-bold text-center text-gray-500 uppercase">{bank.name}</span>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="p-6 space-y-6">
            <div className="bg-[#1a4b7a] bg-opacity-80 rounded-lg p-4 mb-4 text-white text-xs">
              Send money to beloved ones in a blink by CashPickUp and Account options.
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block">Amount *</label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="0.00"
                    className="w-full bg-gray-50 border-none rounded-lg p-4 text-lg font-bold"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-right">
                    <p className="text-[10px] text-gray-400">Beneficiary gets</p>
                    <p className="text-xs font-bold text-[#1a4b7a]">ETB {(parseFloat(formData.amount || '0') * EXCHANGE_RATE).toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block">Account Number / Phone</label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  placeholder="Enter details here"
                  className="w-full bg-gray-50 border-none rounded-lg p-4 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block">Full Name</label>
                <input
                  type="text"
                  value={formData.beneficiaryName}
                  onChange={(e) => setFormData({ ...formData, beneficiaryName: e.target.value })}
                  placeholder="Receiver Name"
                  className="w-full bg-gray-50 border-none rounded-lg p-4 text-sm uppercase"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block">Reason</label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="Transfer reason"
                  className="w-full bg-gray-50 border-none rounded-lg p-4 text-sm h-24"
                />
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={!formData.amount || !formData.beneficiaryName}
              className="w-full bg-[#1a4b7a] text-white font-bold py-4 rounded-lg mt-4 disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="p-6">
            <div className="bg-white border rounded-3xl p-8 flex flex-col items-center shadow-lg relative overflow-hidden">
               <div className="absolute top-0 w-full h-1 bg-[#1a4b7a]"></div>
               <p className="text-3xl font-black text-gray-800 mb-6">${formData.amount}</p>
               
               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-[#1a4b7a] font-bold text-xl">
                 {formData.beneficiaryName.charAt(0)}
               </div>
               <h3 className="font-bold text-[#1a4b7a] uppercase mb-10">{formData.beneficiaryName}</h3>

               <div className="w-full space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount</span>
                    <span className="font-bold text-gray-700">${formData.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Account Number</span>
                    <span className="font-bold text-gray-700">{formData.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Transaction Fee</span>
                    <span className="font-bold text-green-500">Free ( 0 % )</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between">
                    <span className="text-gray-400 font-bold">Total</span>
                    <span className="font-black text-lg text-[#1a4b7a]">${formData.amount}</span>
                  </div>
               </div>

               <p className="text-[10px] text-gray-400 mt-8 text-center italic">Payment will be completed shortly after verification</p>
            </div>

            <div className="mt-8 flex gap-4">
              <button onClick={() => setStep(2)} className="flex-1 py-4 bg-gray-100 rounded-lg text-gray-500 font-bold">Edit</button>
              <button onClick={handleNext} className="flex-2 bg-[#1a4b7a] text-white font-bold py-4 px-10 rounded-lg">Confirm</button>
            </div>
          </div>
        )}

        {step === 4 && (
            <div className="p-6">
                <div className="bg-gray-200 rounded-2xl p-6 mb-8 flex flex-col items-center">
                    <CreditCard size={48} className="text-gray-500 mb-4" />
                    <h3 className="font-bold text-gray-600 uppercase">Secure Payment</h3>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Card Number</label>
                        <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full border-b py-2 focus:outline-none focus:border-[#1a4b7a] font-mono" />
                    </div>
                    <div className="flex gap-6">
                        <div className="flex-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Expiry Date</label>
                            <input type="text" placeholder="MM/YY" className="w-full border-b py-2 focus:outline-none focus:border-[#1a4b7a]" />
                        </div>
                        <div className="flex-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">CVV</label>
                            <input type="text" placeholder="123" className="w-full border-b py-2 focus:outline-none focus:border-[#1a4b7a]" />
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Card Holder</label>
                        <input type="text" placeholder="LEWI HAILE" className="w-full border-b py-2 focus:outline-none focus:border-[#1a4b7a] uppercase" />
                    </div>

                    <button onClick={handleConfirm} className="w-full bg-green-500 text-white font-bold py-4 rounded-lg mt-10 shadow-lg">Pay now</button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
