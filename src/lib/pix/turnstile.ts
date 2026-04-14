export async function verifyTurnstile(token: string, ip: string): Promise<{ success: boolean; error?: string }> {
  if (process.env.PIX_TURNSTILE_ENABLED === 'false') return { success: true };
  if (!token) return { success: false, error: 'Missing Turnstile token' };

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: ip,
      }),
    });

    const data = await response.json();
    if (data.success) return { success: true };
    return { success: false, error: data['error-codes']?.join(', ') || 'Verification failed' };
  } catch {
    // Fail open: never block legitimate users due to Cloudflare outage
    return { success: true };
  }
}
