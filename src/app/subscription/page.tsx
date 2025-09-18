'use client';

import HeaderOne from '@/components/Layout/Text/HeaderOne';
import HeaderTwo from '@/components/Layout/Text/HeaderTwo';
import { isErrorResponse, postRequest } from '@/lib/api/requestHelpers';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type SubscriptionPlan = {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
};

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free Plan',
    price: 0,
    description: 'Basic features for beginners',
    features: [
      'Create 3 Builds',
      'Basic rating features',
      'Community browsing',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: 1000,
    description: 'Advanced features for professional players',
    features: [
      'Unlimited Builds',
      'Priority rating',
      'Advanced analytics',
      'Exclusive tags',
    ],
    isPopular: true,
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 2000,
    description: 'Complete features for hardcore players',
    features: [
      'All Pro features',
      'Personalized recommendations',
      'Priority support',
      'Early access to Beta features',
    ],
  },
];

const Subscription = () => {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string>('free');
  const [isLoading, setIsLoading] = useState(false);

  const submitSubscriptionHandle = async (planId: string) => {
    setIsLoading(true);
    console.log('submitSubscriptionHandle for plan:', planId);

    try {
      const plan = subscriptionPlans.find((p) => p.id === planId);
      if (!plan) return;

      const res = await postRequest<any>(
        '/payment/create-subscription',
        {
          name: plan.name,
          description: plan.description,
          price: plan.price,
        },
        true
      );

      console.log('response after subscription creation:', res);

      if (isErrorResponse(res)) {
        alert(res.result);
        return;
      }

      if (res?.result?.id) {
        router.push(`/`);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Subscription failed, please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <HeaderOne>Choose Your Plan</HeaderOne>
        <div className="mt-4">
          <HeaderTwo>
            Unlock more features and enhance your gaming experience
          </HeaderTwo>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-customContentBg rounded-lg p-6 shadow-customBlockShadow transition-all cursor-pointer ${
              selectedPlan === plan.id
                ? 'ring-2 ring-customSecondary shadow-customBlockShadowHover'
                : 'hover:shadow-customBlockShadowHover'
            }`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-customSecondary text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-customTxtContent mb-2">
                {plan.name}
              </h3>
              <div className="text-3xl font-bold text-customSecondary mb-2">
                {plan.price === 0 ? 'Free' : `$${plan.price}`}
                {plan.price > 0 && (
                  <span className="text-sm text-customTxtContent">/month</span>
                )}
              </div>
              <p className="text-customTxtContent text-sm">
                {plan.description}
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center text-customTxtContent"
                >
                  <span className="text-customSecondary mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            {plan.price > 0 && (
              <button
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  selectedPlan === plan.id
                    ? 'bg-customSecondary text-white hover:bg-opacity-90'
                    : 'bg-customBg text-customTxtContent hover:bg-opacity-80'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  submitSubscriptionHandle(plan.id);
                }}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Choose Plan'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
