import { clerkMiddleware, createRouteMatcher  } from "@clerk/nextjs/server";



// Mark /api/webhooks and any subroutes as public
const isPublicRoute = createRouteMatcher([
  "/api/webhooks/clerk",
]);

export default clerkMiddleware(async (auth, req) => {
  // Make webhook routes public
  if (isPublicRoute(req)) {
    const authObject = await auth();
    return new Response(null, { status: 200 }); // Allow public access
  }

  // All other routes are protected (authenticated)
  const authObject = await auth();
  if (!authObject.userId) {
    return new Response("Unauthorized", { status: 401 }); // Protect route
  }
  return new Response(null, { status: 200 }); // Allow access for authenticated users
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};