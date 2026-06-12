import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

export const PricingSection = () => {
  const plans = [
    { 
      name: 'Basic Free', 
      price: '0', 
      period: 'forever',
      description: 'Ideal for trial and light study sessions.',
      features: ['5 document uploads/month', 'Standard AI summary cards', 'Self-study flashcards', 'Basic web dashboard access'],
      cta: 'Start Free',
      popular: false,
    },
    { 
      name: 'Pro Student', 
      price: '9.99', 
      period: 'month',
      description: 'Engineered for full-time academic courses.',
      features: ['Unlimited uploads (up to 50MB)', 'Advanced AI quiz generator', 'Full chat assistant access', 'Export summaries and flashcards', 'Priority server queue times'],
      cta: 'Upgrade to Pro',
      popular: true,
    },
    { 
      name: 'Research Team', 
      price: '29.99', 
      period: 'month',
      description: 'For shared workspaces and collaboration.',
      features: ['Shared document spaces', 'Shared study folders', 'Team analytics dashboards', 'Consolidated billing invoice', '24/7 dedicated support representative'],
      cta: 'Contact Team',
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-24 border-b border-white/[0.06] relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Pricing Tiers</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2 tracking-tight">
            Transparent pricing, tailored to your studies
          </h2>
          <p className="mt-4 text-zinc-400 text-sm leading-relaxed">
            Choose a plan that fits your workload. Cancel, upgrade, or downgrade anytime.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`glass-card p-8 rounded-[4px] border flex flex-col justify-between relative h-full ${
                plan.popular 
                  ? 'border-indigo-500/40 bg-indigo-500/[0.02] shadow-[0_4px_30px_rgba(99,102,241,0.05)]' 
                  : 'border-white/[0.08] hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-2.5 left-6 px-2 py-0.5 rounded-[2px] bg-indigo-600 text-[9px] font-bold text-white uppercase tracking-wider">
                  Most Popular
                </span>
              )}
              
              <div>
                {/* Header */}
                <h3 className="text-sm font-semibold text-white uppercase tracking-wide font-mono">{plan.name}</h3>
                <p className="text-[11px] text-zinc-400 mt-1.5 min-h-[32px]">{plan.description}</p>
                
                {/* Pricing block */}
                <div className="mt-6 flex items-baseline gap-1 text-white">
                  <span className="text-3xl font-extrabold font-display">${plan.price}</span>
                  <span className="text-zinc-500 text-xs font-medium">/{plan.period}</span>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-white/[0.06] my-6" />

                {/* Features */}
                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-400">
                      <Check className={`h-4 w-4 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-indigo-400' : 'text-zinc-500'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call to Action Button */}
              <Link to="/signup" className="w-full">
                <button 
                  className={`w-full py-2 px-4 rounded-[4px] text-xs font-semibold transition-all ${
                    plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200 border border-white/[0.08]'
                  }`}
                >
                  {plan.cta}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingSection

