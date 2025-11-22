import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link2, LogOut, User } from 'lucide-react';
import Button from './Button';
import toastService from '../utils/toast';

const NavBar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toastService.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="bg-background-card border-b-2 border-border shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/dashboard')}
          >
            <Link2 className="w-7 h-7 text-primary" />
            <span className="text-2xl font-bold text-text">TinyLink</span>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-text-light">
              <User className="w-5 h-5" />
              <span className="font-medium">{user.username || user.email}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
