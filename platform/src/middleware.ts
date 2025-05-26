import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {handleAuthVerify} from "@/lib/middleware";

export const middleware = async (request: NextRequest) => {
  
  const authResponse = await handleAuthVerify(request);
  if (authResponse) return authResponse;

  return NextResponse.next();
};