import { NextResponse, type NextRequest } from "next/server";

function isRetiredOrSpamPath(pathname: string) {
  return (
    pathname === "/wp-login.php" ||
    pathname === "/xmlrpc.php" ||
    pathname.startsWith("/wp-admin") ||
    pathname.startsWith("/prizes") ||
    /\.(?:php|asp|aspx)$/i.test(pathname)
  );
}

export function proxy(request: NextRequest) {
  if (isRetiredOrSpamPath(request.nextUrl.pathname)) {
    return new NextResponse(null, {
      status: 410,
      headers: {
        "Cache-Control": "public, max-age=3600",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|brand/|portfolio/|favicon.ico).*)"],
};

