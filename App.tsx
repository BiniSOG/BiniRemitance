
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { History } from './pages/History';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import { TransferFlow } from './pages/TransferFlow';
import { AdminDashboard } from './pages/AdminDashboard';
import { storage } from './store';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = storage.getCurrentUser();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/history" 
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/notifications" 
          element={
            <PrivateRoute>
              <Notifications />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/transfer/:type" 
          element={
            <PrivateRoute>
              <TransferFlow />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
