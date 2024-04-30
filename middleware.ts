import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


const protectRoutes = createRouteMatcher([
    '/',
    '/upcoming',
    '/previous',
    '/personal-room',
    'meeting(.*)'
])


export default clerkMiddleware((auth: () => { (): any; new(): any; protect: { (): void; new(): any; }; }, req: any) => {
    if(protectRoutes(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
