import { NextApiRequest, NextApiResponse } from 'next';
import { NextApiHandler } from 'next';

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

const defaultConfig: RateLimitConfig = {
  maxRequests: 100, // 100 requests
  windowMs: 60 * 1000, // per minute
};

export function withRateLimit(
  handler: NextApiHandler,
  config: Partial<RateLimitConfig> = {}
) {
  const { maxRequests, windowMs } = { ...defaultConfig, ...config };

  return async (req: NextApiRequest, res: NextApiResponse) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    // Initialize or get existing rate limit data
    if (!store[ip]) {
      store[ip] = {
        count: 0,
        resetTime: now + windowMs,
      };
    }

    // Reset if window has passed
    if (now > store[ip].resetTime) {
      store[ip] = {
        count: 0,
        resetTime: now + windowMs,
      };
    }

    // Check if rate limit exceeded
    if (store[ip].count >= maxRequests) {
      return res.status(429).json({
        error: 'Too many requests',
        retryAfter: Math.ceil((store[ip].resetTime - now) / 1000),
      });
    }

    // Increment counter
    store[ip].count++;

    // Add rate limit headers
    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', maxRequests - store[ip].count);
    res.setHeader('X-RateLimit-Reset', store[ip].resetTime);

    return handler(req, res);
  };
} 