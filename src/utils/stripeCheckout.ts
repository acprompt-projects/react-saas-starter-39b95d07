import { PlanId } from '../hooks/useSubscription';

interface CheckoutSessionParams {
  planId: PlanId;
  userId: string;
  email: string;
  successUrl?: string;
  cancelUrl?: string;
}

interface CheckoutResult {
  url: string | null;
  error: string | null;
}

const STRIPE_API_BASE = '/api/billing';

/**
 * Creates a Stripe Checkout Session and redirects the user to Stripe.
 * Replace the implementation with your real Stripe integration.
 */
export async function redirectToStripeCheckout(
  params: CheckoutSessionParams
): Promise<CheckoutResult> {
  const { planId, userId, email, successUrl, cancelUrl } = params;

  try {
    const response = await fetch(`${STRIPE_API_BASE}/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        planId,
        userId,
        email,
        successUrl: successUrl ?? `${window.location.origin}/billing?success=true`,
        cancelUrl: cancelUrl ?? `${window.location.origin}/billing?canceled=true`,
      }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      return { url: null, error: body?.error ?? 'Failed to create checkout session' };
    }

    const session = await response.json();

    if (session.url) {
      window.location.href = session.url;
      return { url: session.url, error: null };
    }

    return { url: null, error: 'No checkout URL returned' };
  } catch (err) {
    return {
      url: null,
      error: err instanceof Error ? err.message : 'Network error',
    };
  }
}

/**
 * Opens the Stripe Customer Portal for managing an existing subscription.
 */
export async function redirectToCustomerPortal(
  userId: string,
  returnUrl?: string
): Promise<CheckoutResult> {
  try {
    const response = await fetch(`${STRIPE_API_BASE}/portal-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        returnUrl: returnUrl ?? `${window.location.origin}/billing`,
      }),
    });

    if (!response.ok) {
      return { url: null, error: 'Failed to create portal session' };
    }

    const session = await response.json();

    if (session.url) {
      window.location.href = session.url;
      return { url: session.url, error: null };
    }

    return { url: null, error: 'No portal URL returned' };
  } catch (err) {
    return {
      url: null,
      error: err instanceof Error ? err.message : 'Network error',
    };
  }
}