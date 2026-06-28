import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function HeroSection() {
  const navigate = useNavigate()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black"></div>
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
          transform: `scale(${1 + scrollY * 0.0003})`,
        }}
      ></div>

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      ></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
        <div className="text-center space-y-10">
          
          {/* Main headline with reveal animation */}
          <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1]">
              WE MAKE LEARNING
              <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                EFFORTLESS
              </span>
            </h1>
          </div>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-zinc-400 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in-up animation-delay-200">
            Transform any document into personalized study materials with AI
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-in-up animation-delay-400">
            <button
              onClick={() => navigate('/signup')}
              className="group relative px-10 py-5 bg-white text-black rounded-full font-semibold text-lg hover:bg-zinc-100 transition-all duration-300 hover:scale-105 shadow-2xl shadow-white/10 flex items-center gap-3"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Trust badge */}
          <div className="pt-16 animate-fade-in-up animation-delay-600">
            <p className="text-sm text-zinc-600 uppercase tracking-[0.2em] mb-6">TRUSTED BY STUDENTS WORLDWIDE</p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-40">
              <div className="text-zinc-500 font-semibold text-sm sm:text-base">AI-POWERED</div>
              <div className="w-px h-4 bg-zinc-800"></div>
              <div className="text-zinc-500 font-semibold text-sm sm:text-base">INSTANT SUMMARIES</div>
              <div className="w-px h-4 bg-zinc-800"></div>
              <div className="text-zinc-500 font-semibold text-sm sm:text-base">SMART QUIZZES</div>
              <div className="w-px h-4 bg-zinc-800"></div>
              <div className="text-zinc-500 font-semibold text-sm sm:text-base">FLASHCARDS</div>
            </div>
          </div>
        </div>

        {/* Floating orbs decoration */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow animation-delay-1000"></div>
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
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  )
}
