import type { NextFetchEvent, NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './libs/i18nNavigation';

const intlMiddleware = createMiddleware(routing);

export default function middleware(
  request: NextRequest,
  _event: NextFetchEvent,
) {
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|monitoring|public|sitemap.xml|robots.txt|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|mp4|webm|ogg|mov|avi|mkv|m4v|wmv|flv)).*)',
  ],
};
