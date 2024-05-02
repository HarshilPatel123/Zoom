import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define the routes to be protected
const protectRoutes = createRouteMatcher([
    '/',
    '/upcoming',
    '/previous',
    '/personal-room',
    '/meeting(.*)' // Adjusted to include the correct route
]);

// Apply Clerk authentication middleware to protect routes
export default clerkMiddleware((auth, req) => {
    if (protectRoutes(req)) {
        auth().protect();
    }
});

// Export configuration
export const config = {
    // Define the routes to be excluded from middleware
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
