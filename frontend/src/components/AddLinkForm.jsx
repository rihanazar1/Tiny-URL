import React, { useState } from 'react';
import { Link2, X } from 'lucide-react';
import Input from './Input';
import Button from './Button';
import Card from './Card';
import { useCreateLinkMutation } from '../store/api/linksApi';
import toastService from '../utils/toast';

const AddLinkForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    url: '',
    short_code: '',
  });
  const [errors, setErrors] = useState({});

  const [createLink, { isLoading }] = useCreateLinkMutation();

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateShortCode = (code) => {
    if (!code) return true; // Optional field
    const regex = /^[A-Za-z0-9]{6,8}$/;
    return regex.test(code);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.url.trim()) {
      newErrors.url = 'URL is required';
    } else if (!validateUrl(formData.url)) {
      newErrors.url = 'Please enter a valid URL';
    }

    if (formData.short_code && !validateShortCode(formData.short_code)) {
      newErrors.short_code = 'Short code must be 6-8 alphanumeric characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      const payload = {
        url: formData.url,
        ...(formData.short_code && { short_code: formData.short_code }),
      };

      const response = await createLink(payload).unwrap();
      
      toastService.success('Link created successfully!');
      setFormData({ url: '', short_code: '' });
      onSuccess?.();
      onClose?.();
    } catch (error) {
      if (error.status === 409) {
        setErrors({ short_code: 'This short code already exists' });
        toastService.error('Short code already exists');
      } else {
        toastService.error(error.data?.message || 'Failed to create link');
      }
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link2 className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-text">Add New Link</h2>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Target URL *"
          name="url"
          type="url"
          placeholder="https://example.com"
          value={formData.url}
          onChange={handleChange}
          error={errors.url}
        />

        <Input
          label="Custom Short Code (Optional)"
          name="short_code"
          placeholder="mycode (6-8 characters)"
          value={formData.short_code}
          onChange={handleChange}
          error={errors.short_code}
        />

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            disabled={isLoading}
            className="flex-1"
          >
            Create Short Link
          </Button>
          {onClose && (
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};

export default AddLinkForm;
