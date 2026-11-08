import { useState, type ReactNode } from 'react';
import { AuthContext, type AuthContextType, type User } from './AuthContext';

/**
 * Minimal demo provider.
 *
 * `useSubscription()` (agent-authored) throws when no AuthContext is present,
 * so the app cannot mount without one. This provider supplies a signed-in demo
 * user on the Free plan. Replace it with a real auth client before production.
 */
const DEMO_USER: User = {
  id: 'demo-user',
  email: 'jane@example.com',
  subscription: {
    plan: 'free',
    isActive: true,
    currentPeriodEnd: null,
    cancelAtPeriodEnd: false,
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(DEMO_USER);

  const value: AuthContextType = {
    user,
    loading: false,
    login: async () => {
      setUser(DEMO_USER);
    },
    logout: () => {
      setUser(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
