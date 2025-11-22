import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Link2 } from 'lucide-react';
import { useLoginMutation } from '../../store/api/authAPI';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';
import toastService from '../../utils/toast';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      const response = await login(formData).unwrap();
      
      // Store token
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      toastService.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toastService.error(error.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Link2 className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold text-text">TinyLink</h1>
          </div>
          <p className="text-text-light">Sign in to your account</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            <Button
              type="submit"
              variant="primary"
              loading={isLoading}
              disabled={isLoading}
              className="w-full"
            >
              <LogIn className="w-5 h-5" />
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-light text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:text-primary-dark font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;