import { NextRequest } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

const MINUTE_LIMIT = 20;
const DAY_LIMIT = 200;
const MINUTE_MS = 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

function cleanStore() {
  if (store.size > 10000) {
    const now = Date.now();
    for (const [key, entry] of store) {
      if (entry.resetAt < now) store.delete(key);
    }
  }
}

export function checkRateLimit(ip: string): { allowed: boolean; reason?: string; message?: string; retryAfter?: number } {
  if (process.env.PIX_RATE_LIMIT_ENABLED === 'false') return { allowed: true };

  cleanStore();
  const now = Date.now();

  const minuteKey = `${ip}:min:${Math.floor(now / MINUTE_MS)}`;
  const dayKey = `${ip}:day:${Math.floor(now / DAY_MS)}`;

  const minuteEntry = store.get(minuteKey) || { count: 0, resetAt: now + MINUTE_MS };
  const dayEntry = store.get(dayKey) || { count: 0, resetAt: now + DAY_MS };

  if (minuteEntry.count >= MINUTE_LIMIT) {
    return {
      allowed: false,
      reason: 'minute_limit',
      message: 'You are sending messages too quickly. Please wait a moment and try again.',
      retryAfter: Math.ceil((minuteEntry.resetAt - now) / 1000),
    };
  }

  if (dayEntry.count >= DAY_LIMIT) {
    return {
      allowed: false,
      reason: 'day_limit',
      message: 'You have reached the daily message limit. Please come back tomorrow or contact us at pixelettetech.com/contact-us.',
      retryAfter: Math.ceil((dayEntry.resetAt - now) / 1000),
    };
  }

  minuteEntry.count++;
  dayEntry.count++;
  store.set(minuteKey, minuteEntry);
  store.set(dayKey, dayEntry);

  return { allowed: true };
}

export function getIpFromRequest(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const parts = forwarded.split(',').map(s => s.trim());
    return parts[parts.length - 1] || parts[0] || '127.0.0.1';
  }
  return req.headers.get('x-real-ip') || '127.0.0.1';
}
