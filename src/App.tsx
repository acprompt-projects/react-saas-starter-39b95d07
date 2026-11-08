import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';
import { navItems } from './components/DashboardLayout/navConfig';
import BillingPage from './pages/BillingPage';
import OverviewPage from './pages/OverviewPage';
import PlaceholderPage from './pages/PlaceholderPage';
import LoginPage from './pages/LoginPage';

/**
 * The app shell. Everything under /dashboard renders inside the agent-authored
 * DashboardLayout; each nav item gets a real route so no link dead-ends.
 */
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<OverviewPage />} />
          <Route
            path="billing"
            element={<BillingPage userId="demo-user" userEmail="jane@example.com" />}
          />
          {navItems
            .filter((item) => item.path !== '/dashboard')
            .map((item) => (
              <Route
                key={item.path}
                path={item.path.replace('/dashboard/', '')}
                element={<PlaceholderPage title={item.label} />}
              />
            ))}
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}
