import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link2, Zap, Shield, BarChart3 } from 'lucide-react';
import Button from '../../components/Button';

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Link2 className="w-16 h-16 text-primary" />
            <h1 className="text-6xl font-bold text-text">TinyLink</h1>
          </div>
          <p className="text-2xl text-text-light mb-8 max-w-2xl mx-auto">
            Shorten your URLs, track your clicks, and share with confidence
          </p>
          <div className="flex gap-4 justify-center">
            {isAuthenticated ? (
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/register')}
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-background-card rounded-xl p-8 shadow-lg border border-border text-center hover:border-primary/50 transition-all">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-text mb-2">Lightning Fast</h3>
            <p className="text-text-light">
              Create short links instantly with our optimized platform
            </p>
          </div>

          <div className="bg-background-card rounded-xl p-8 shadow-lg border border-border text-center hover:border-violet/50 transition-all">
            <div className="w-16 h-16 bg-violet/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-violet" />
            </div>
            <h3 className="text-xl font-bold text-text mb-2">Track Analytics</h3>
            <p className="text-text-light">
              Monitor clicks and engagement with detailed statistics
            </p>
          </div>

          <div className="bg-background-card rounded-xl p-8 shadow-lg border border-border text-center hover:border-green-500/50 transition-all">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-text mb-2">Secure & Reliable</h3>
            <p className="text-text-light">
              Your links are protected with enterprise-grade security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;