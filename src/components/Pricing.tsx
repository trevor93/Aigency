import { Check, Sparkles, Zap, Crown } from 'lucide-react';

interface PricingTier {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  icon: 'sparkles' | 'zap' | 'crown';
  cta: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: 997,
    period: 'month',
    description: 'Perfect for small businesses getting started with automation',
    features: [
      'Custom website design & development',
      'Mobile-responsive design',
      'Basic SEO optimization',
      'Contact form integration',
      'Monthly maintenance & updates',
      'Email support',
      'SSL certificate included',
      'Hosting & domain setup',
    ],
    highlighted: false,
    icon: 'sparkles',
    cta: 'Start Now',
  },
  {
    name: 'Pro',
    price: 1997,
    period: 'month',
    description: 'Most popular choice for businesses scaling operations',
    features: [
      'Everything in Starter, plus:',
      'Advanced automation workflows',
      'CRM integration (HubSpot, Salesforce)',
      'Custom API integrations',
      'E-commerce functionality',
      'Analytics & reporting dashboard',
      'Priority support (24/7)',
      'Dedicated account manager',
      'A/B testing & optimization',
      'Advanced security features',
    ],
    highlighted: true,
    icon: 'zap',
    cta: 'Get Started',
  },
  {
    name: 'Enterprise',
    price: 4997,
    period: 'month',
    description: 'Comprehensive solution for large-scale operations',
    features: [
      'Everything in Pro, plus:',
      'Custom software development',
      'Multi-platform integration',
      'Advanced workflow automation',
      'White-label solutions',
      'Dedicated development team',
      'Custom training & onboarding',
      'SLA guarantees',
      'Unlimited revisions',
      'Strategic consulting',
      'Priority feature requests',
    ],
    highlighted: false,
    icon: 'crown',
    cta: 'Contact Sales',
  },
];

function PricingCard({ tier }: { tier: PricingTier }) {
  const IconComponent = tier.icon === 'sparkles' ? Sparkles : tier.icon === 'zap' ? Zap : Crown;

  return (
    <div
      className={`relative group ${
        tier.highlighted
          ? 'transform scale-105 z-10'
          : 'transform hover:scale-105 transition-transform duration-300'
      }`}
    >
      {tier.highlighted && (
        <div className="absolute -top-5 left-0 right-0 flex justify-center">
          <span className="bg-gradient-to-r from-aqua-500 to-aqua-400 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg">
            Most Popular
          </span>
        </div>
      )}

      <div
        className={`h-full rounded-2xl overflow-hidden transition-all duration-300 ${
          tier.highlighted
            ? 'bg-gradient-to-br from-navy-900 to-navy-800 border-2 border-aqua-500 shadow-2xl shadow-aqua-500/20'
            : 'bg-white dark:bg-navy-800 border-2 border-slate-200 dark:border-navy-700 hover:border-aqua-400 dark:hover:border-aqua-500 shadow-lg hover:shadow-xl'
        }`}
      >
        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                tier.highlighted
                  ? 'bg-gradient-to-br from-aqua-500 to-aqua-400 icon-glow'
                  : 'bg-gradient-to-br from-slate-100 to-slate-200 dark:from-navy-700 dark:to-navy-600'
              }`}
            >
              <IconComponent
                className={`w-6 h-6 ${tier.highlighted ? 'text-white' : 'text-aqua-500'}`}
                strokeWidth={2}
              />
            </div>
            <h3
              className={`text-2xl font-bold ${
                tier.highlighted ? 'text-white' : 'text-slate-900 dark:text-white'
              }`}
            >
              {tier.name}
            </h3>
          </div>

          <p
            className={`text-sm mb-6 leading-relaxed ${
              tier.highlighted ? 'text-aqua-200' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            {tier.description}
          </p>

          <div className="mb-8">
            <div className="flex items-baseline gap-2">
              <span
                className={`text-5xl font-bold ${
                  tier.highlighted ? 'text-white' : 'text-slate-900 dark:text-white'
                }`}
              >
                ${tier.price.toLocaleString()}
              </span>
              <span
                className={`text-lg ${
                  tier.highlighted ? 'text-aqua-300' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                /{tier.period}
              </span>
            </div>
          </div>

          <button
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 mb-8 relative overflow-hidden group/btn ${
              tier.highlighted
                ? 'bg-gradient-to-r from-aqua-500 to-aqua-400 hover:from-aqua-600 hover:to-aqua-500 text-white shadow-lg hover:shadow-xl'
                : 'bg-gradient-to-r from-slate-100 to-slate-200 dark:from-navy-700 dark:to-navy-600 hover:from-aqua-500 hover:to-aqua-400 text-slate-900 dark:text-white hover:text-white shadow-md hover:shadow-lg'
            }`}
          >
            <span className="relative z-10">{tier.cta}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
          </button>

          <ul className="space-y-4">
            {tier.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                    tier.highlighted
                      ? 'bg-aqua-500/20'
                      : 'bg-slate-100 dark:bg-navy-700'
                  }`}
                >
                  <Check
                    className={`w-3 h-3 ${
                      tier.highlighted ? 'text-aqua-400' : 'text-aqua-500'
                    }`}
                    strokeWidth={3}
                  />
                </div>
                <span
                  className={`text-sm leading-tight ${
                    tier.highlighted ? 'text-white' : 'text-slate-700 dark:text-slate-200'
                  } ${feature.startsWith('Everything in') ? 'font-semibold' : ''}`}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,217,255,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,217,255,0.05),transparent_50%)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aqua-500/10 border border-aqua-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-aqua-500" strokeWidth={2} />
            <span className="text-sm font-semibold text-aqua-600 dark:text-aqua-400">
              Flexible Pricing
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Choose Your Growth Plan
          </h2>

          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Every plan is designed to help your business run smoothly and automatically.
            Scale as you grow with our flexible subscription tiers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 max-w-7xl mx-auto items-start">
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            All plans include SSL certificate, hosting, and ongoing support
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Need a custom solution?{' '}
            <a href="#contact" className="text-aqua-600 dark:text-aqua-400 font-semibold hover:underline">
              Contact us
            </a>{' '}
            for personalized pricing
          </p>
        </div>
      </div>
    </section>
  );
}
