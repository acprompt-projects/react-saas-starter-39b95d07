import { describe, expect, it } from 'vitest';
import { navItems } from '../components/DashboardLayout/navConfig';

describe('navItems', () => {
  it('keeps every route unique and under /dashboard', () => {
    const paths = navItems.map((item) => item.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const path of paths) {
      expect(path.startsWith('/dashboard')).toBe(true);
    }
  });

  it('gives every item a label and a renderable icon', () => {
    for (const item of navItems) {
      expect(item.label.length).toBeGreaterThan(0);
      expect(item.icon).toBeTruthy();
    }
  });
});
