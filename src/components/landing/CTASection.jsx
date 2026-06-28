import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function CTASection() {
  const navigate = useNavigate()

  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full filter blur-3xl opacity-20"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        
        {/* Content */}
        <div className="p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-sm">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already studying smarter with Learnly. Get started for free today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/signup')}
              className="group px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-sm font-medium transition-all flex items-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-transparent border border-white/20 hover:border-white/30 text-white rounded-sm font-medium transition-all"
            >
              View Pricing
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-zinc-500">
            <span>✓ No credit card required</span>
            <span>✓ 3 free uploads</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  )
}
