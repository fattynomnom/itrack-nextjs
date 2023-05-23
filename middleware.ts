import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const middleware = (request: NextRequest) => {
    // const user = onAuthStateChanged()
    // if (
    //     (request.nextUrl.pathname.startsWith('/login') ||
    //         request.nextUrl.pathname.startsWith('/register')) &&
    //     user
    // ) {
    //     return NextResponse.rewrite(new URL('/dashboard', request.url))
    // }
    // if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
    //     return NextResponse.rewrite(new URL('/login', request.url))
    // }
}
