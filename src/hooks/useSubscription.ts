import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthContext';

export type PlanId = 'free' | 'pro' | 'enterprise';

export interface SubscriptionStatus {
  plan: PlanId;
  isActive: boolean;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
}

const DEFAULT_SUBSCRIPTION: SubscriptionStatus = {
  plan: 'free',
  isActive: true,
  currentPeriodEnd: null,
  cancelAtPeriodEnd: false,
};

export function useSubscription(): SubscriptionStatus & { loading: boolean } {
  const auth = useContext<AuthContextType | null>(AuthContext);

  if (!auth) {
    throw new Error('useSubscription must be used within an AuthProvider');
  }

  const { user, loading } = auth;

  const subscription: SubscriptionStatus = user?.subscription
    ? {
        plan: (user.subscription.plan as PlanId) ?? 'free',
        isActive: user.subscription.isActive ?? true,
        currentPeriodEnd: user.subscription.currentPeriodEnd ?? null,
        cancelAtPeriodEnd: user.subscription.cancelAtPeriodEnd ?? false,
      }
    : DEFAULT_SUBSCRIPTION;

  return { ...subscription, loading };
}