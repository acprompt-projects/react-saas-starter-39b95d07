import {
  HomeIcon,
  ChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export interface NavItem {
  label: string;
  icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  path: string;
  badge?: string;
}

export const navItems: NavItem[] = [
  { label: "Dashboard", icon: HomeIcon, path: "/dashboard" },
  { label: "Analytics", icon: ChartBarIcon, path: "/dashboard/analytics" },
  { label: "Users", icon: UsersIcon, path: "/dashboard/users", badge: "3" },
  { label: "Documents", icon: DocumentTextIcon, path: "/dashboard/documents" },
  { label: "Admin", icon: ShieldCheckIcon, path: "/dashboard/admin" },
  { label: "Settings", icon: Cog6ToothIcon, path: "/dashboard/settings" },
];