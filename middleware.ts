import {
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";


// Define ALL routes that should be publicly accessible without login
const isPublicRoute = createRouteMatcher([
  '/api/webhooks(.*)', // Your webhook route pattern
  '/',                      // Example: Make homepage public
  '/sign-in(.*)',           // Sign-in page and potential sub-routes
  '/sign-up(.*)',           // Sign-up page and potential sub-routes
  // Add any other public pages like /about, /pricing etc.
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // If the route is public, allow access regardless of authentication status.
  if (isPublicRoute(req)) {
    return; // Allows the request to proceed to the route handler
  }

  // If the route is NOT public, and the user is NOT signed in,
  // redirect them to the sign-in page.
  if (!userId) {
    // You can customize the returnBackUrl query parameter if needed
    return Response.redirect(`/sign-in?returnBackUrl=${encodeURIComponent(req.url)}`);
  }

  // If the route is NOT public, and the user IS signed in,
  // allow the request to proceed.
  // No explicit return is needed here; falling through allows access.
  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};