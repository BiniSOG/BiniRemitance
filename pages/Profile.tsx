
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { BottomNav } from '../components/BottomNav';
import { storage } from '../store';
import { Camera, CreditCard, HelpCircle, ShieldCheck, FileText, Info, LogOut, CheckCircle2, LayoutDashboard } from 'lucide-react';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const user = storage.getCurrentUser();
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const [showUpdateToast, setShowUpdateToast] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    storage.setCurrentUser(null);
    navigate('/login');
  };

  const handlePhotoSelect = () => {
    setShowPhotoPicker(false);
    setShowUpdateToast(true);
    setTimeout(() => setShowUpdateToast(false), 3000);
  };

  const menuItems = [
    { label: 'Saved Cards', icon: CreditCard, path: null },
    { label: 'Help and Support', icon: HelpCircle, path: null },
    { label: 'Privacy and Policy', icon: ShieldCheck, path: null },
    { label: 'Terms And Conditions', icon: FileText, path: null },
    { label: 'About CashGo', icon: Info, path: null },
    { label: 'Admin Dashboard', icon: LayoutDashboard, path: '/admin' },
  ];

  return (
    <Layout>
      {showUpdateToast && (
        <div className="bg-green-500 text-white p-4 flex gap-3 animate-in fade-in slide-in-from-top duration-300 absolute top-0 w-full z-[100]">
           <CheckCircle2 size={20} />
           <div>
              <p className="font-bold text-sm">Profile Update</p>
              <p className="text-xs">Photo uploaded successfully</p>
           </div>
        </div>
      )}

      <div className="flex-1 flex flex-col bg-white overflow-y-auto pb-20">
        <div className="bg-[#1a4b7a] pt-12 pb-20 px-6 relative flex flex-col items-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#1a4b7a] text-3xl font-black mb-4 border-4 border-blue-200 overflow-hidden relative">
              {user.profileImage ? (
                <img src={user.profileImage} alt="" />
              ) : (
                <span>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</span>
              )}
              <button 
                onClick={() => setShowPhotoPicker(true)}
                className="absolute bottom-0 right-0 p-1.5 bg-[#1a4b7a] text-white border-2 border-white rounded-full shadow-lg"
              >
                <Camera size={12} />
              </button>
            </div>
            <h2 className="text-white font-bold text-xl">{user.firstName} {user.lastName}</h2>
            <p className="text-blue-100 opacity-80 text-xs">{user.phone}</p>
        </div>

        <div className="bg-white rounded-t-3xl -mt-10 px-6 pt-10 space-y-2">
            {menuItems.map((item) => (
                <button 
                  key={item.label} 
                  onClick={() => item.path && navigate(item.path)}
                  className="w-full flex items-center gap-4 py-4 border-b border-gray-50 active:bg-gray-50"
                >
                    <item.icon size={18} className="text-[#1a4b7a]" />
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </button>
            ))}

            <button onClick={handleLogout} className="w-full flex items-center gap-4 py-6 text-red-500 font-bold mt-2">
                <LogOut size={18} />
                <span className="text-sm">Log out</span>
            </button>
        </div>

        <div className="flex flex-col items-center mt-10 opacity-50 pb-10">
            <h1 className="text-2xl font-black italic text-[#1a4b7a] tracking-tighter">Cash<span className="font-light">GO</span></h1>
            <p className="text-[9px] mt-2">All Right Reserved © 2023</p>
            <p className="text-[9px]">V2.5.12</p>
        </div>
      </div>

      {showPhotoPicker && (
        <div className="absolute inset-0 bg-black/50 z-[200] flex items-end">
            <div className="bg-white w-full rounded-t-3xl p-8 space-y-6">
                <h3 className="font-bold text-lg text-[#1a4b7a]">Select a Photo</h3>
                <div className="space-y-4">
                    <button onClick={handlePhotoSelect} className="w-full text-left py-3 text-sm text-gray-700 font-medium">Take Photo...</button>
                    <button onClick={handlePhotoSelect} className="w-full text-left py-3 text-sm text-gray-700 font-medium border-t">Choose from Library...</button>
                </div>
                <div className="pt-2">
                    <button onClick={() => setShowPhotoPicker(false)} className="w-full text-red-500 font-bold py-2">CANCEL</button>
                </div>
            </div>
        </div>
      )}

      <BottomNav />
    </Layout>
  );
};
