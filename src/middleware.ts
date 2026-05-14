import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Imagens em public/images/tournaments — expostas também em /tournaments/torneio*.jpg
 * para não colidir com a rota dinâmica app/tournaments/[slug] (ficheiro estático).
 */
const TOURNAMENT_JPEG = /^\/tournaments\/(torneio\d+\.jpe?g)$/i;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const jpg = TOURNAMENT_JPEG.exec(pathname);
  if (jpg) {
    const url = request.nextUrl.clone();
    url.pathname = `/images/tournaments/${jpg[1]}`;
    return NextResponse.rewrite(url);
  }

  const segment = /^\/torneios\/([^/]+)$/.exec(pathname)?.[1];
  if (!segment) return NextResponse.next();
  if (segment.includes(".")) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/tournaments/${segment}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/torneios/:path*", "/tournaments/:path*"],
};
