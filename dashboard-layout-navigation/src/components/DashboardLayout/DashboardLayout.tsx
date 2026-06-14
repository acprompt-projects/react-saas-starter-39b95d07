import { useState, useEffect, useCallback, Fragment } from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { navItems, type NavItem } from "./navConfig";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  SunIcon,
  MoonIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

function useDarkMode() {
  const [dark, setDark] = useState<boolean>(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return [dark, setDark] as const;
}

export default function DashboardLayout() {
  const [dark, setDark] = useDarkMode();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = useCallback(
    (path: string) =>
      path === "/dashboard"
        ? location.pathname === "/dashboard"
        : location.pathname.startsWith(path),
    [location.pathname]
  );

  const handleLogout = () => {
    setProfileOpen(false);
    navigate("/login");
  };

  const SidebarLink = ({ item }: { item: NavItem }) => {
    const active = isActive(item.path);
    return (
      <Link
        to={item.path}
        onClick={() => setSidebarOpen(false)}
        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          active
            ? "bg-indigo-600 text-white dark:bg-indigo-500"
            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        }`}
      >
        <item.icon className="h-5 w-5 shrink-0" />
        {!collapsed && <span className="truncate">{item.label}</span>}
        {!collapsed && item.badge && (
          <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-gray-200 bg-white transition-all duration-200 dark:border-gray-700 dark:bg-gray-900 lg:static lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${collapsed ? "w-16" : "w-64"}`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-700">
          {!collapsed && (
            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              SaaSKit
            </span>
          )}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="hidden rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 lg:block"
          >
            {collapsed ? (
              <ChevronDoubleRightIcon className="h-5 w-5" />
            ) : (
              <ChevronDoubleLeftIcon className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => (
            <SidebarLink key={item.path} item={item} />
          ))}
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-900">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-3 ml-auto">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDark(!dark)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {dark ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                  JD
                </div>
              </button>

              {profileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setProfileOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 z-20 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Jane Doe
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        jane@example.com
                      </p>
                    </div>
                    <Link
                      to="/dashboard/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <UserCircleIcon className="h-4 w-4" /> Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <ArrowRightOnRectangleIcon className="h-4 w-4" /> Sign
                      out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}