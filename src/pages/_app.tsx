import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '../styles/globals.css';
import Layout from '../components/layout/Layout';
import { supabase } from '../lib/supabase';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith('/admin');

  useEffect(() => {
    // Handle admin authentication
    if (isAdminPage) {
      const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        
        // If not on login page and no session, redirect to login
        if (!session && router.pathname !== '/admin/login') {
          router.push('/admin/login');
        }
        
        // If on login page and has session, redirect to dashboard
        if (session && router.pathname === '/admin/login') {
          router.push('/admin/dashboard');
        }
      };

      checkAuth();
    }
  }, [router.pathname, isAdminPage]);

  // Don't use the default layout for admin pages
  if (isAdminPage) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp; 