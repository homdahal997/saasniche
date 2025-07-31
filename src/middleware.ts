import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files and API routes that don't need auth
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/auth/') ||
    pathname.startsWith('/api/webhooks/') ||
    pathname.match(/\.(ico|png|svg|jpg|jpeg|gif|webp)$/)
  ) {
    return NextResponse.next()
  }

  // Public routes that don't require authentication
  const publicRoutes = ['/auth/signin', '/auth/signup', '/', '/pricing', '/about', '/dev-plan']
  // Protect all /dashboard routes
  const isDashboardRoute = pathname.startsWith('/dashboard')
  const isPublicRoute = publicRoutes.includes(pathname)
  const isProtectedRoute = isDashboardRoute

  const session = await auth()

  // Redirect to login if not authenticated and trying to access protected route
  if (!session && isProtectedRoute && !isPublicRoute) {
    const redirectUrl = new URL('/auth/signin', request.url)
    redirectUrl.searchParams.set('callbackUrl', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect authenticated users away from auth pages, but not from protected routes
  // Allow /auth/invite and its subroutes for onboarding invited users
  if (
    session &&
    (pathname.startsWith('/auth/') || pathname === '/') &&
    !pathname.startsWith('/auth/invite')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Add tenant context to headers for authenticated users
  if (session?.user?.tenantId) {
    const response = NextResponse.next()
    response.headers.set('x-tenant-id', session.user.tenantId)
    response.headers.set('x-user-id', session.user.id)
    response.headers.set('x-user-role', session.user.role)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
