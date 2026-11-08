import { afterEach, describe, expect, it, vi } from 'vitest';
import { redirectToCustomerPortal } from '../utils/stripeCheckout';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('redirectToCustomerPortal', () => {
  it('returns an error instead of throwing when the network fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('boom')));
    const result = await redirectToCustomerPortal('u1', 'https://example.com/billing');
    expect(result).toEqual({ url: null, error: 'boom' });
  });

  it('returns a clear error on a non-OK response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    const result = await redirectToCustomerPortal('u1', 'https://example.com/billing');
    expect(result).toEqual({ url: null, error: 'Failed to create portal session' });
  });
});
