import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const redirectTo = (request: NextRequest, pathname: string) => {
    const url = request.nextUrl.clone();
    url.pathname = pathname;
    return NextResponse.redirect(url);
};


export const handleAuthVerify = async (request: NextRequest) => {
    const sessionCookie = await getSessionCookie(request);
    const currentPath = request.nextUrl.pathname

    if (!sessionCookie && currentPath !== "/auth/signin") {
      return redirectTo(request, '/auth/signin')
    } 
    else if (sessionCookie && currentPath === "/auth/signin") {
        return redirectTo(request, '/')
    }
  
    return null;
};