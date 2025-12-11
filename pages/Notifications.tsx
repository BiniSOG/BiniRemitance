
import React from 'react';
import { Layout } from '../components/Layout';
import { BottomNav } from '../components/BottomNav';

export const Notifications: React.FC = () => {
  return (
    <Layout>
      <div className="flex-1 flex flex-col bg-gray-50">
        <div className="bg-white p-6 border-b">
          <h1 className="text-lg font-bold text-[#1a4b7a]">Notifications</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center opacity-60">
           <div className="bg-slate-100 p-10 rounded-3xl mb-4">
              <span className="text-5xl">📬</span>
           </div>
           <p className="text-gray-400 text-sm font-medium">No Notifications Yet</p>
        </div>
      </div>
      <BottomNav />
    </Layout>
  );
};
