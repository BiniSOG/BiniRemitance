
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Zap, History, Bell, User } from 'lucide-react';
import { COLORS } from '../constants';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Send', icon: Zap, path: '/' },
    { label: 'History', icon: History, path: '/history' },
    { label: 'Notification', icon: Bell, path: '/notifications' },
    { label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <div className="flex justify-around items-center bg-white border-t py-3 px-2 sticky bottom-0 w-full z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-1"
          >
            <item.icon
              size={20}
              color={isActive ? COLORS.primary : '#94a3b8'}
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span
              className={`text-[10px] font-medium ${
                isActive ? 'text-[#1a4b7a]' : 'text-slate-400'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
