import React from 'react';

export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

interface PlanCardProps {
  plan: Plan;
  isCurrentPlan: boolean;
  onSelect: (planId: string) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, isCurrentPlan, onSelect }) => {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 shadow-sm transition-all hover:shadow-md ${
        isCurrentPlan
          ? 'border-blue-500 ring-2 ring-blue-500'
          : plan.highlighted
          ? 'border-blue-400 ring-1 ring-blue-400'
          : 'border-gray-200'
      }`}
    >
      {plan.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-3 py-0.5 text-xs font-semibold text-white">
          Popular
        </span>
      )}

      <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
      <p className="mt-1 text-sm text-gray-500">{plan.description}</p>

      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
        {plan.price !== 'Custom' && (
          <span className="text-sm text-gray-500">/{plan.period}</span>
        )}
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(plan.id)}
        disabled={isCurrentPlan}
        className={`mt-8 w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
          isCurrentPlan
            ? 'cursor-default bg-gray-100 text-gray-400'
            : plan.highlighted
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50'
        }`}
      >
        {isCurrentPlan ? 'Current Plan' : plan.cta}
      </button>
    </div>
  );
};

export default PlanCard;