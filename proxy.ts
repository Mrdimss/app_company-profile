import { NextResponse, type NextRequest } from "next/server";
import { isLocale, localeCookieName, resolvePreferredLocale } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const firstSegment = pathname.split("/")[1];

  if (firstSegment === "en-US") {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en-US(?=\/|$)/, "/en");
    return NextResponse.redirect(url);
  }

  if (isLocale(firstSegment)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-girik-locale", firstSegment);

    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    response.cookies.set(localeCookieName, firstSegment, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  const url = request.nextUrl.clone();
  const locale = resolvePreferredLocale(
    request.cookies.get(localeCookieName)?.value,
    request.headers.get("accept-language"),
  );
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|admin|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
