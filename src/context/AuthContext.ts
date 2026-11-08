import { createContext } from 'react';
import { PlanId } from '../hooks/useSubscription';

export interface UserSubscription {
  plan: PlanId;
  isActive: boolean;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
}

export interface User {
  id: string;
  email: string;
  subscription?: UserSubscription;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);