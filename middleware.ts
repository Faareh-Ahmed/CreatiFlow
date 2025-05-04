// middleware.ts (or src/middleware.ts)

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// public routes
const isPublicRoute = createRouteMatcher([
  "/api/webhooks(.*)",
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(
  // Note: first argument is `auth`, second is the NextRequest
  async (auth, req) => {
    // auth() is the function injected by Clerk
    const { userId, redirectToSignIn } = await auth();

    // 1) Public route → let it through
    if (isPublicRoute(req)) {
      return NextResponse.next();
    }

    // 2) Protected & not signed in → redirect via Clerk helper
    if (!userId) {
      return redirectToSignIn({
        returnBackUrl: req.nextUrl.toString(),
      });
    }

    // 3) Protected & signed in → let it through
    return NextResponse.next();
  }
);

export const config = {
  matcher: [
    // everything but _next static / images and your webhook
    "/((?!_next|favicon.ico|assets|api/webhooks).*)",
    // all other API routes
    "/api/:path*",
  ],
};
