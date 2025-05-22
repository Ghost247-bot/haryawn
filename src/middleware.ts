import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check if the request is for the admin dashboard
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to login page
    if (req.nextUrl.pathname === '/admin/login') {
      return res;
    }

    // Check if user is authenticated
    if (!session) {
      console.log('No session found, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    try {
      // Check if user is an admin
      const { data: adminData, error } = await supabase
        .from('admins')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (error) {
        console.error('Admin check error:', error);
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }

      if (!adminData) {
        console.log('User is not an admin:', session.user.id);
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }

      console.log('Admin access verified for:', session.user.email);
    } catch (error) {
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*'],
}; 