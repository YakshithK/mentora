import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const redirectTo = (request: NextRequest, pathname: string) => {
    const url = request.nextUrl.clone();
    url.pathname = pathname;
    return NextResponse.redirect(url);
};

export const handleAuthVerify = async (request: NextRequest) => {
    const sessionCookie = await getSessionCookie(request);
  
    if (!sessionCookie) {
      return redirectTo(request, '/auth/signin')
    }
  
    return null;
};

// Special case in which logic is differs (therefore warrants its own function)
export const handleAuthSignInVerify = async (request: NextRequest) => {
  const sessionCookie = await getSessionCookie(request);
  const currentPath = request.nextUrl.pathname
  
  if (sessionCookie && currentPath === "/signin") {
    return redirectTo(request, '/')
  }

  return null;
}