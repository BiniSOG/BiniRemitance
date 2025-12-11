
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div id="app-container" className="relative flex flex-col h-screen overflow-hidden">
      {children}
    </div>
  );
};
