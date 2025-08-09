import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Permitir acceso a la pantalla de login SIN cookie para evitar el loop
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const isAdminRoute = pathname.startsWith('/admin');
  const isAdminApi = pathname.startsWith('/api/inventory') || pathname.startsWith('/api/upload');

  if (isAdminRoute || isAdminApi) {
    const cookie = req.cookies.get('admin_auth');
    if (!cookie || cookie.value !== '1') {
      if (isAdminRoute) {
        const url = req.nextUrl.clone();
        url.pathname = '/admin/login';
        return NextResponse.redirect(url);
      }
      return new NextResponse('Unauthorized', { status: 401 });
    }
  }

  return NextResponse.next();
}

// Excluir explícitamente /admin/login del matcher
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/inventory',
    '/api/upload'
  ]
};