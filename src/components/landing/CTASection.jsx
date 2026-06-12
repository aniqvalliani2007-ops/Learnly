import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export const CTASection = () => {
  return (
    <section className="py-28 relative overflow-hidden border-b border-white/[0.06]">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] max-w-[300px] max-h-[300px] glow-orb pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)' }} />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="glass-card p-12 rounded-[4px] border border-white/[0.08] text-center shadow-[0_15px_40px_rgba(0,0,0,0.4)] relative overflow-hidden">
          <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-white/[0.02] to-transparent pointer-events-none" />
          
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] bg-zinc-950 border border-white/[0.05] text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-6">
            <Sparkles className="h-3 w-3 text-indigo-400" />
            <span>INSTANT ACADEMIC ACCELERATION</span>
          </div>

          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-none">
            Ready to Study Smarter?
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm mb-8 max-w-md mx-auto leading-relaxed">
            Join thousands of academic scholars, medical students, and researchers using Learnly to master complex reading materials.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup">
              <button className="flex items-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-semibold px-6 py-2.5 rounded-[4px] border border-white/20 transition-all shadow-md group">
                Create Free Account
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-white/[0.03] hover:bg-white/[0.07] text-zinc-300 text-xs font-semibold px-6 py-2.5 rounded-[4px] border border-white/[0.08] transition-all">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection

