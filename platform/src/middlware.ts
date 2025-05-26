import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {handleAuthSignInVerify, handleAuthVerify} from "@/lib/middleware";

export const middleware = async (request: NextRequest) => {
  const userResponse = await handleAuthVerify(request);
  if (userResponse) return userResponse;
  

  const signinResponse = await handleAuthSignInVerify(request);
  if (signinResponse) return signinResponse;
  

  return NextResponse.next();
};