import React, { useState } from 'react';
import PlanCard, { Plan } from '../components/PlanCard';
import { useSubscription, PlanId } from '../hooks/useSubscription';
import { redirectToStripeCheckout } from '../utils/stripeCheckout';

const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'month',
    description: 'For individuals getting started.',
    features: [
      'Up to 3 projects',
      '1 GB storage',
      'Community support',
      'Basic analytics',
    ],
    cta: 'Get Started',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29',
    period: 'month',
    description: 'For professionals and growing teams.',
    features: [
      'Unlimited projects',
      '50 GB storage',
      'Priority email support',
      'Advanced analytics',
      'Custom domains',
      'Team collaboration',
    ],
    cta: 'Upgrade to Pro',
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations with advanced needs.',
    features: [
      'Everything in Pro',
      'Unlimited storage',
      '24/7 dedicated support',
      'SSO & SAML',
      'SLA guarantee',
      'Custom integrations',
      'Dedicated account manager',
    ],
    cta: 'Contact Sales',
  },
];

interface BillingPageProps {
  userId?: string;
  userEmail?: string;
}

const BillingPage: React.FC<BillingPageProps> = ({ userId = '', userEmail = '' }) => {
  const { plan: currentPlan, cancelAtPeriodEnd, loading } = useSubscription();
  const [processingPlan, setProcessingPlan] = useState<PlanId | null>(null);

  const handleSelectPlan = async (planId: PlanId) => {
    if (planId === currentPlan) return;

    if (planId === 'enterprise') {
      window.location.href = 'mailto:sales@example.com?subject=Enterprise%20Plan';
      return;
    }

    setProcessingPlan(planId);

    const result = await redirectToStripeCheckout({
      planId,
      userId,
      email: userEmail,
    });

    if (result.error) {
      console.error('Checkout error:', result.error);
      alert(`Checkout failed: ${result.error}`);
    }

    setProcessingPlan(null);
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Billing & Plans</h1>
        <p className="mt-2 text-gray-500">
          Choose the plan that fits your needs. Upgrade or downgrade anytime.
        </p>
      </div>

      {cancelAtPeriodEnd && (
        <div className="mx-auto mt-6 max-w-2xl rounded-lg bg-amber-50 p-4 text-center text-sm text-amber-800">
          Your subscription will be canceled at the end of the current billing period.
        </div>
      )}

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
        {PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isCurrentPlan={plan.id === currentPlan}
            onSelect={(id) => handleSelectPlan(id as PlanId)}
          />
        ))}
      </div>
    </div>
  );
};

export default BillingPage;