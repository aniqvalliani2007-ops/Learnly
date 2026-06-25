import { motion } from 'framer-motion'
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
      features: ['Shared document spaces', 'Shared study folders', 'Team analytics dashboards', 'Consolidated billing invoice', '24/7 dedicated support'],
      cta: 'Contact Team',
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-32 bg-zinc-950 border-y border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sans text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Transparent pricing
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-lg text-neutral-400 font-sans"
          >
            Choose a plan that fits your workload. Cancel anytime.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`p-8 rounded-2xl flex flex-col justify-between relative h-full bg-black ${
                plan.popular 
                  ? 'border-2 border-primary shadow-[0_0_30px_rgba(217,98,38,0.15)] scale-105 z-10' 
                  : 'border border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="px-4 py-1 rounded-full bg-primary text-xs font-bold text-white uppercase tracking-wider shadow-md">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div>
                {/* Header */}
                <h3 className="text-xl font-bold text-white tracking-tight">{plan.name}</h3>
                <p className="text-sm text-neutral-400 mt-2 min-h-[40px]">{plan.description}</p>
                
                {/* Pricing block */}
                <div className="mt-6 flex items-baseline gap-1 text-white">
                  <span className="text-5xl font-bold tracking-tighter">${plan.price}</span>
                  <span className="text-neutral-500 font-medium">/{plan.period}</span>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10 my-8 w-full" />

                {/* Features */}
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.popular ? 'bg-primary/20' : 'bg-white/5'}`}>
                        <Check className={`w-3 h-3 ${plan.popular ? 'text-primary' : 'text-neutral-400'}`} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call to Action Button */}
              <Link to="/signup" className="w-full">
                <button 
                  className={`w-full py-4 rounded-full text-base font-bold transition-all ${
                    plan.popular
                      ? 'bg-primary hover:bg-orange-600 text-white'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  {plan.cta}
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingSection

