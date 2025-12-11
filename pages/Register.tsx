
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Globe, Phone, Lock } from 'lucide-react';
import { storage } from '../store';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: 'Ethiopia',
    phone: '+251 ',
    password: '',
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleRegister = () => {
    const newErrors = [];
    if (formData.password.length < 8) newErrors.push('Password must be at least 8 characters');
    if (!/[0-9]/.test(formData.password)) newErrors.push('Password must have numeric characters');
    if (!/[!@#$%^&*]/.test(formData.password)) newErrors.push('Password must have symbol characters');
    if (!/[a-z]/.test(formData.password)) newErrors.push('Password must have lowercase characters');

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const user = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      pin: formData.password.substr(0, 5), // Simulating 5 digit pin from password
    };

    storage.saveUser(user);
    storage.setCurrentUser(user);
    navigate('/');
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      {/* Red Error Bar mimicking image */}
      {errors.length > 0 && (
        <div className="bg-red-500 text-white p-4 flex gap-3 animate-in fade-in slide-in-from-top duration-300">
           <div className="bg-white rounded-full p-1 h-fit">
              <span className="text-red-500 font-bold text-xs">!</span>
           </div>
           <div>
              <p className="font-bold text-sm">Error</p>
              <p className="text-xs">{errors[0]}</p>
           </div>
        </div>
      )}

      <div className="px-6 pt-6 flex justify-between items-center mb-6">
        <button onClick={() => navigate(-1)} className="text-[#1a4b7a]">
          <ArrowLeft />
        </button>
        <h1 className="text-lg font-bold text-[#1a4b7a]">Create Account</h1>
        <div className="w-6"></div>
      </div>

      <div className="px-8 space-y-6 pb-10">
        <div className="relative">
          <div className="absolute left-0 bottom-2 text-gray-400">
            <User size={18} />
          </div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block ml-7">
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="enter first name here"
            className="w-full border-b border-gray-200 py-2 pl-7 text-sm focus:outline-none focus:border-[#1a4b7a]"
          />
        </div>

        <div className="relative">
          <div className="absolute left-0 bottom-2 text-gray-400">
            <User size={18} />
          </div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block ml-7">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="enter last name here"
            className="w-full border-b border-gray-200 py-2 pl-7 text-sm focus:outline-none focus:border-[#1a4b7a]"
          />
        </div>

        <div className="relative">
          <div className="absolute left-0 bottom-2 text-gray-400">
            <Mail size={18} />
          </div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block ml-7">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="info@gmail.com"
            className="w-full border-b border-gray-200 py-2 pl-7 text-sm focus:outline-none focus:border-[#1a4b7a]"
          />
        </div>

        <div className="relative">
          <div className="absolute left-0 bottom-2 text-gray-400">
            <Globe size={18} />
          </div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block ml-7">
            Country *
          </label>
          <div className="flex items-center gap-2 border-b border-gray-200 py-2 pl-7">
            <span className="text-xl">🇪🇹</span>
            <span className="text-sm">Ethiopia</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-0 bottom-2 text-gray-400">
            <Phone size={18} />
          </div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block ml-7">
            Phone *
          </label>
          <div className="flex items-center border-b border-gray-200 py-2 pl-7">
             <span className="text-xl mr-2">🇪🇹</span>
             <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-0 bottom-2 text-gray-400">
            <Lock size={18} />
          </div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block ml-7">
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="••••••"
            className="w-full border-b border-gray-200 py-2 pl-7 text-sm focus:outline-none focus:border-[#1a4b7a]"
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-[#1a4b7a] text-white font-bold py-4 rounded-lg mt-8 shadow-lg"
        >
          Register
        </button>

        <div className="text-center pt-4">
          <p className="text-gray-400 text-xs mb-1">Already have an account?</p>
          <button
            onClick={() => navigate('/login')}
            className="text-[#1a4b7a] font-bold text-sm"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
