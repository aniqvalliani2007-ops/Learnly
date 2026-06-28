import { Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for trying out Learnly",
    features: [
      "3 document uploads",
      "AI-generated summaries",
      "Basic flashcards",
      "Limited quizzes",
      "Community support"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    price: "9.99",
    description: "For serious students",
    features: [
      "Unlimited uploads",
      "Advanced AI summaries",
      "Unlimited flashcards",
      "Unlimited quizzes",
      "Study assistant chat",
      "Progress tracking",
      "Priority support"
    ],
    cta: "Upgrade to Pro",
    popular: true
  },
  {
    name: "Lifetime",
    price: "99",
    description: "One-time payment",
    features: [
      "Everything in Pro",
      "Lifetime access",
      "Early access to features",
      "Premium support",
      "No recurring fees"
    ],
    cta: "Get Lifetime Access",
    popular: false
  }
]

export default function PricingSection() {
  const navigate = useNavigate()

  return (
    <section id="pricing" className="relative w-full py-24 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="max-w-6xl mx-auto px-6 w-full">
        
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Choose the plan that works best for you
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 backdrop-blur-xl border rounded-sm transition-all ${
                plan.popular
                  ? 'bg-white/10 border-indigo-500/50 shadow-lg shadow-indigo-500/20'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-sm text-white text-xs font-semibold">
                  Most Popular
                </div>
              )}

              {/* Plan name */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-zinc-400">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  {plan.price !== "99" && <span className="text-zinc-400">/month</span>}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                    <Check className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA button */}
              <button
                onClick={() => navigate('/signup')}
                className={`w-full py-3 rounded-sm font-medium transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white'
                    : 'bg-white/10 hover:bg-white/15 border border-white/20 text-white'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
