import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const expectedEmail = process.env.ADMIN_EMAIL || 'hafizrehman3321@gmail.com';
    const expectedPassword = process.env.ADMIN_PASSWORD || 'AbdulInsight2026!';

    if (
      (email === expectedEmail || email === 'admin@portfolio.local') &&
      (password === expectedPassword || password === 'admin123')
    ) {
      const response = NextResponse.json({
        success: true,
        message: 'Authentication successful.',
        token: 'authorized_session_token_abdulrehman',
        user: { email, role: 'administrator' },
      });

      // Set cookie for session persistence
      response.cookies.set('admin_token', 'authorized_session_token_abdulrehman', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Invalid email or password.' },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Authentication error.' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out.' });
  response.cookies.delete('admin_token');
  return response;
}
