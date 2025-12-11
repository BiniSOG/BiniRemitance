
import React from 'react';
import { Bank } from './types';

export const COLORS = {
  primary: '#1a4b7a',
  secondary: '#334155',
  accent: '#3b82f6',
  error: '#ef4444',
  success: '#22c55e',
};

export const MOCK_BANKS: Bank[] = [
  { 
    id: '1', 
    name: 'Commercial Bank of Ethiopia', 
    logo: 'https://upload.wikimedia.org/wikipedia/en/2/23/Commercial_Bank_of_Ethiopia_logo.png' 
  },
  { 
    id: '2', 
    name: 'Bank of Abyssinia', 
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6A73Yx2K_4Q5S_Vz3p1m6G9r9_N9H9q6y_w&s' 
  },
  { 
    id: '3', 
    name: 'Dashen Bank', 
    logo: 'https://picsum.photos/seed/dashen/100/100' 
  },
  { 
    id: '4', 
    name: 'Awash Bank', 
    logo: 'https://picsum.photos/seed/awash/100/100' 
  }
];

export const EXCHANGE_RATE = 54.18; // 1 USD = 54.18 ETB
