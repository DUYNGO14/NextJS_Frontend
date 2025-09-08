import { NextRequest, NextResponse } from "next/server";


const publicPaths = ["/", "/about", "/blog", "/posts", "/matches"];


const privatePaths = ["/profile", "/dashboard", "/settings"];


const authPaths = ["/auth/login", "/auth/register"];
function matchPath(pathname: string, paths: string[]) {
  return paths.some(
    (path) =>
      pathname === path || pathname.startsWith(path + "/")
  );
}
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("token")?.value;

  if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
