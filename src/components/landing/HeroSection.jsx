import { ArrowRight, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-950 via-black to-zinc-950">
      {/* Animated background blur effects */}
      <div className="absolute top-0 -left-40 w-80 h-80 bg-indigo-600/20 rounded-full mix-blend-normal filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-40 w-80 h-80 bg-purple-600/20 rounded-full mix-blend-normal filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-pink-600/20 rounded-full mix-blend-normal filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-white/5 backdrop-blur-xl border border-white/10">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-zinc-300">AI-Powered Learning Platform</span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Transform Your Study Materials Into
            <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Interactive Learning
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Upload any document and get instant AI-generated summaries, flashcards, quizzes, and personalized study assistance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              onClick={() => navigate('/signup')}
              className="group px-8 py-3 bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 text-white rounded-sm font-medium transition-all hover:border-white/30 flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-transparent border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white rounded-sm font-medium transition-all"
            >
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">10K+</div>
              <div className="text-sm text-zinc-500">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">500K+</div>
              <div className="text-sm text-zinc-500">Documents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">95%</div>
              <div className="text-sm text-zinc-500">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-zinc-500">AI Support</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}
