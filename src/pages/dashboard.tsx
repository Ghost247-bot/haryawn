import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState('');
  const [profileMsg, setProfileMsg] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/login');
      } else {
        setUser(session.user);
        setDisplayName(session.user.user_metadata?.display_name || '');
      }
      setLoading(false);
    };
    checkSession();
    // Load dark mode preference
    setDarkMode(localStorage.getItem('darkMode') === 'true');
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg('');
    if (!user) return;
    const { error } = await supabase.auth.updateUser({ data: { display_name: displayName } });
    if (error) {
      setProfileMsg('Failed to update profile.');
    } else {
      setProfileMsg('Profile updated!');
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg('');
    if (!user) return;
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setPasswordMsg('Failed to change password.');
    } else {
      setPasswordMsg('Password changed!');
      setPassword('');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem('darkMode', String(!prev));
      return !prev;
    });
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded shadow text-center">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <button onClick={toggleDarkMode} className="ml-2 px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-xs">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        {/* Profile Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Profile</h3>
          <form onSubmit={handleProfileUpdate} className="space-y-2">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input value={user?.email || ''} disabled className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium">Display Name</label>
              <input value={displayName} onChange={e => setDisplayName(e.target.value)} className="w-full px-3 py-2 border rounded" />
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Update Profile</button>
            {profileMsg && <div className="text-sm mt-1">{profileMsg}</div>}
          </form>
        </div>
        {/* Change Password */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Change Password</h3>
          <form onSubmit={handlePasswordChange} className="space-y-2">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="New Password" className="w-full px-3 py-2 border rounded" />
            <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Change Password</button>
            {passwordMsg && <div className="text-sm mt-1">{passwordMsg}</div>}
          </form>
        </div>
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard; 