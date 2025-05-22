import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiLoader, FiCheck, FiX } from 'react-icons/fi';

interface FormState {
  email: string;
  name: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

const SubscribeForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    email: '',
    name: '',
  });
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.email || !formData.name) {
      setStatus({
        type: 'error',
        message: 'Please fill in all fields'
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address'
      });
      return;
    }

    setStatus({ type: 'loading' });

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to subscribe');
      }

      setStatus({
        type: 'success',
        message: 'Thank you for subscribing!'
      });
      setFormData({ email: '', name: '' });

      // Reset success message after 3 seconds
      setTimeout(() => {
        setStatus({ type: 'idle' });
      }, 3000);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to subscribe. Please try again.'
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
      <div className="flex items-center gap-2 mb-4">
        <FiBell className="w-5 h-5 text-blue-300" />
        <h3 className="text-lg font-semibold">Subscribe to Updates</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Your Name"
            className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-white/50 text-white"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Your Email"
            className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-white/50 text-white"
          />
        </div>
        
        <button
          type="submit"
          disabled={status.type === 'loading'}
          className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status.type === 'loading' ? (
            <>
              <FiLoader className="w-5 h-5 animate-spin" />
              Subscribing...
            </>
          ) : (
            <>
              <FiBell className="w-5 h-5" />
              Subscribe
            </>
          )}
        </button>

        <AnimatePresence>
          {status.message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
                status.type === 'error' 
                  ? 'bg-red-500/20 text-red-100' 
                  : status.type === 'success'
                  ? 'bg-green-500/20 text-green-100'
                  : ''
              }`}
            >
              {status.type === 'error' && <FiX className="w-4 h-4" />}
              {status.type === 'success' && <FiCheck className="w-4 h-4" />}
              {status.message}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default SubscribeForm; 