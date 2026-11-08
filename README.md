# SaaSKit — react-saas-starter

A **runnable** React 18 + TypeScript + Vite SaaS dashboard starter: sidebar
layout with dark mode, an overview, and a full pricing/billing page.

[![CI](https://github.com/acprompt-projects/react-saas-starter-39b95d07/actions/workflows/ci.yml/badge.svg)](https://github.com/acprompt-projects/react-saas-starter-39b95d07/actions/workflows/ci.yml)

`npm ci && npm run build` and `npm test` both pass locally and in GitHub Actions.

## Quick start

```bash
npm ci
npm run dev       # http://localhost:5173
npm run build     # tsc --noEmit && vite build  ->  dist/
npm run preview   # serve the production build locally
npm test          # vitest run
```

Requires Node 20+ (CI uses Node 20). No environment variables, no API keys, no
backend needed to build or browse the UI.

## What's inside

| Route | Screen |
|---|---|
| `/dashboard` | Overview with metrics cards |
| `/dashboard/billing` | Pricing page (Free / Pro / Enterprise) |
| `/dashboard/analytics`, `/users`, `/documents`, `/admin`, `/settings` | Wired placeholder routes |
| `/login` | Demo sign-in form |

Stack: React 18, react-router-dom 6, Tailwind CSS 3 (`darkMode: 'class'`),
Heroicons, TypeScript strict mode, Vite 6, Vitest.

## Provenance — be precise about who wrote what

This repository began as an [ACPrompt](https://www.acprompt.com) agent project
(June 2026). Agents produced **7 real source files**, but shipped them as two
loose per-task directories with no `package.json`, no entry point and no build
config — the repo could not be installed or run at all.

| Files | Written by | When |
|---|---|---|
| `src/components/DashboardLayout/DashboardLayout.tsx`, `navConfig.ts` | ACPrompt agents | 2026-06-14 |
| `src/pages/BillingPage.tsx`, `src/components/PlanCard.tsx`, `src/context/AuthContext.ts`, `src/hooks/useSubscription.ts`, `src/utils/stripeCheckout.ts` | ACPrompt agents | 2026-06-14 |
| Build config, `main.tsx`, `App.tsx`, `AuthProvider.tsx`, `OverviewPage.tsx`, `PlaceholderPage.tsx`, `LoginPage.tsx`, `index.css`, tests, CI, this README | Assembled by hand | 2026-11-09 |

The 7 agent files were moved into a real `src/` tree **byte-for-byte**
(verified with `cmp`), not rewritten. Exactly one line was added to
`navConfig.ts` — a `React` type import — because `tsc --noEmit` otherwise
cannot resolve the `React.ForwardRefExoticComponent` namespace. No
agent-authored logic or JSX was changed. The old per-task directories were
removed so there is a single source tree.

`AuthProvider.tsx` exists because `useSubscription()` throws without an
`AuthContext` provider; it supplies an in-memory demo user on the Free plan.

## Known limitations (deliberately not hidden)

- **Billing has no backend.** `redirectToStripeCheckout()` POSTs to
  `/api/billing/create-checkout-session`, which this static app does not serve.
  Clicking "Upgrade to Pro" will show a `Checkout failed` alert. Point it at a
  real Stripe Checkout Session endpoint before taking payments.
- **Auth is a demo.** There is no real identity provider or session storage.
- **Most dashboard pages are placeholders.** Only Overview and Billing contain
  real UI.

## Why this repo matters

It is the first ACPrompt project repository that a stranger can clone, install,
and build without guessing. The goal of this change is honest evidence that the
platform's generated code can be assembled into working software — not a claim
that the assembly happened automatically.
