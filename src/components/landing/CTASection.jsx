import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function CTASection() {
  const navigate = useNavigate()

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/20 to-black"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 70%)'
      }}></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Heading */}
        <div className="space-y-6 mb-12 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            READY TO TRANSFORM
            <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              YOUR LEARNING?
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
            Join thousands of students already learning smarter with Learnly
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center animate-fade-in-up animation-delay-200">
          <button
            onClick={() => navigate('/signup')}
            className="group relative px-12 py-6 bg-white text-black rounded-full font-bold text-xl hover:bg-zinc-100 transition-all duration-300 hover:scale-105 shadow-2xl shadow-white/20 flex items-center gap-3"
          >
            Start For Free
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Subtext */}
        <p className="text-sm text-zinc-600 mt-8 animate-fade-in-up animation-delay-400">
          No credit card required • Free plan available • Cancel anytime
        </p>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}
