import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function GET(request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const next = requestUrl.searchParams.get('next') ?? '/';
    const origin = requestUrl.origin;

    const error = requestUrl.searchParams.get('error');
    const errorDescription = requestUrl.searchParams.get('error_description');

    if (error || errorDescription) {
        console.error('OAuth provider error:', error, errorDescription);
        return NextResponse.redirect(
            new URL(`/?auth_error=${encodeURIComponent(errorDescription || error || 'oauth_failed')}`, origin)
        );
    }

    if (code) {
        let response = NextResponse.redirect(new URL(next, origin));

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll();
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            request.cookies.set(name, value);
                            response.cookies.set(name, value, options);
                        });
                    },
                },
            }
        );

        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (!exchangeError) {
            return response;
        }
        console.error('OAuth code exchange failed:', exchangeError);
        return NextResponse.redirect(
            new URL(`/?auth_error=${encodeURIComponent(exchangeError.message)}`, origin)
        );
    }

    return NextResponse.redirect(new URL('/?auth_error=no_code_provided', origin));
}
