
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { storage } from '../store';

export const Login: React.FC = () => {
  const [loginType, setLoginType] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = storage.getUsers();
    const user = users.find(u => 
      (loginType === 'email' ? u.email === identifier : u.phone === identifier) && 
      u.pin === pin
    );

    if (user) {
      storage.setCurrentUser(user);
      navigate('/');
    } else {
      setError('Invalid credentials. Please try again or create an account.');
    }
  };

  return (
    <div className="flex-1 flex flex-col px-8 pt-16 bg-white overflow-y-auto">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-[#1a4b7a] mb-2 flex items-center gap-2">
          Welcome Back to CashGo 👋
        </h1>
        <p className="text-gray-500 text-sm">Send money to beloved ones in a blink!</p>
      </div>

      <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setLoginType('email')}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
            loginType === 'email' ? 'bg-white text-[#1a4b7a] shadow-sm' : 'text-gray-500'
          }`}
        >
          Email
        </button>
        <button
          onClick={() => setLoginType('phone')}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
            loginType === 'phone' ? 'bg-white text-[#1a4b7a] shadow-sm' : 'text-gray-500'
          }`}
        >
          Phone
        </button>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <div className="absolute left-0 bottom-2 text-gray-400">
            {loginType === 'email' ? <Mail size={18} /> : <Phone size={18} />}
          </div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block ml-7">
            {loginType === 'email' ? 'Email' : 'Phone'}
          </label>
          <input
            type={loginType === 'email' ? 'email' : 'tel'}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder={loginType === 'email' ? 'example@gmail.com' : '+251 Phone Number'}
            className="w-full border-b border-gray-200 py-2 pl-7 text-sm focus:outline-none focus:border-[#1a4b7a]"
          />
        </div>

        <div className="relative">
          <div className="absolute left-0 bottom-2 text-gray-400">
            <Lock size={18} />
          </div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block ml-7">
            PIN
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="•••••"
            className="w-full border-b border-gray-200 py-2 pl-7 text-sm focus:outline-none focus:border-[#1a4b7a]"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 bottom-2 text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button className="text-[#1a4b7a] text-xs font-semibold">Forget Password?</button>
      </div>

      {error && <p className="text-red-500 text-xs mt-4 text-center">{error}</p>}

      <button
        onClick={handleLogin}
        className="w-full bg-[#1a4b7a] text-white font-bold py-4 rounded-lg mt-8 shadow-lg hover:bg-[#153a5e] transition-colors"
      >
        LOGIN
      </button>

      <div className="mt-auto pb-10 text-center">
        <p className="text-gray-400 text-xs mb-2">Don't have an account?</p>
        <button
          onClick={() => navigate('/register')}
          className="text-[#1a4b7a] font-bold text-sm"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};
