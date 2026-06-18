import { useNavigate } from 'react-router-dom'
import { Check, Sparkles, Zap, Users, ArrowLeft, ArrowRight, Lock } from 'lucide-react'

const plans = [
  {
    name: 'Basic Free',
    price: '0',
    period: 'forever',
    description: 'Great for trying out Learnly.',
    features: [
      '3 document uploads total',
      'AI-generated summaries',
      'Flashcard study mode',
      'Basic quiz generation',
      'Chat assistant per document',
    ],
    cta: 'Current Plan',
    current: true,
    popular: false,
    icon: <Lock className="h-4 w-4" />,
  },
  {
    name: 'Pro Student',
    price: '9.99',
    period: 'month',
    description: 'Engineered for full-time academic use.',
    features: [
      'Unlimited document uploads',
      'Advanced AI quiz generator (10+ questions)',
      'Full chat assistant on every doc',
      'Export summaries & flashcards',
      'Priority AI processing queue',
    ],
    cta: 'Upgrade to Pro',
    current: false,
    popular: true,
    icon: <Zap className="h-4 w-4" />,
  },
  {
    name: 'Research Team',
    price: '29.99',
    period: 'month',
    description: 'For groups, teams, and collaborative study.',
    features: [
      'Everything in Pro Student',
      'Shared document workspaces',
      'Team analytics dashboards',
      'Consolidated billing',
      '24/7 dedicated support',
    ],
    cta: 'Contact Team',
    current: false,
    popular: false,
    icon: <Users className="h-4 w-4" />,
  },
]

export default function UpgradePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-300 font-sans">

      {/* Header */}
      <div className="border-b border-white/[0.05] bg-zinc-950 px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="h-7 w-7 rounded-[4px] bg-white text-black font-black flex items-center justify-center text-[13px] shadow-sm">L</span>
          <span className="font-display text-sm font-semibold tracking-tight text-white">Learnly Workspace</span>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Dashboard
        </button>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">

        {/* Hero */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-mono text-indigo-400 uppercase tracking-widest font-semibold">
            <Sparkles className="h-3 w-3" />
            Upgrade Your Plan
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            You've used your 3 free uploads
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Upgrade to Pro to unlock unlimited document uploads, advanced quizzes, and full AI study assistant access.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-[6px] border p-7 flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'border-indigo-500/50 bg-indigo-500/[0.03] shadow-[0_8px_40px_rgba(99,102,241,0.08)]'
                  : plan.current
                  ? 'border-white/[0.06] bg-zinc-950/60 opacity-70'
                  : 'border-white/[0.08] bg-zinc-950/40 hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 text-[10px] font-bold text-white uppercase tracking-wider whitespace-nowrap">
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`${plan.popular ? 'text-indigo-400' : 'text-zinc-500'}`}>
                    {plan.icon}
                  </span>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-400">
                    {plan.name}
                  </span>
                </div>
                <p className="text-[12px] text-zinc-500 mt-1 mb-5 leading-relaxed">{plan.description}</p>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                    ${plan.price}
                  </span>
                  <span className="text-xs text-zinc-500">/{plan.period}</span>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/[0.05] mb-5" />

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-400 leading-relaxed">
                      <Check className={`h-3.5 w-3.5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-indigo-400' : 'text-zinc-500'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                {plan.current ? (
                  <div className="w-full py-2.5 text-center text-xs font-semibold text-zinc-500 border border-white/[0.06] rounded-[4px] cursor-default">
                    Current Plan
                  </div>
                ) : plan.name === 'Research Team' ? (
                  <a
                    href="mailto:support@learnly.app"
                    className="w-full py-2.5 text-center text-xs font-semibold text-zinc-300 border border-white/[0.1] hover:border-white/30 hover:text-white rounded-[4px] transition-all block"
                  >
                    Contact Team
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      // Stripe checkout would go here
                      alert('Stripe checkout coming soon! Contact support to upgrade manually.')
                    }}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-[4px] transition-all flex items-center justify-center gap-1.5 group shadow-lg shadow-indigo-500/20"
                  >
                    Upgrade to Pro
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Fine print */}
        <p className="text-center text-[11px] text-zinc-600 mt-10 font-mono">
          Payments are secure. Cancel anytime. Questions?{' '}
          <a href="mailto:support@learnly.app" className="text-indigo-500 hover:text-indigo-400 transition-colors">
            Contact support
          </a>
        </p>
      </div>
    </div>
  )
}
