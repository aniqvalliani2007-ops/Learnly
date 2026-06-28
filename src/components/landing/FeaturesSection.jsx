import { Brain, Zap, Target, MessageSquare, FileText, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: "AI-Powered Summaries",
    description: "Get instant, comprehensive summaries of any document. Our AI understands context and extracts key concepts automatically."
  },
  {
    icon: FileText,
    title: "Smart Flashcards",
    description: "Automatically generated flashcards that adapt to your learning style. Review anytime, anywhere, on any device."
  },
  {
    icon: Target,
    title: "Intelligent Quizzes",
    description: "Custom quizzes tailored to your document content. Test your knowledge and identify areas that need more focus."
  },
  {
    icon: MessageSquare,
    title: "24/7 Study Assistant",
    description: "Ask questions about your materials anytime. Get instant, accurate answers from our AI-powered chat assistant."
  },
  {
    icon: Zap,
    title: "Instant Processing",
    description: "Upload and process documents in seconds. No waiting, no delays - start studying immediately."
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed analytics. See your improvement over time and stay motivated."
  }
]

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 bg-black overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center mb-20 space-y-4">
          <p className="text-sm text-zinc-600 uppercase tracking-[0.2em]">FEATURES</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            EVERYTHING YOU NEED
            <span className="block mt-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              TO EXCEL
            </span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light mt-6">
            A complete learning ecosystem designed for modern students
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-zinc-950/50 border border-zinc-800 rounded-lg p-8 hover:border-zinc-700 transition-all duration-300 hover:bg-zinc-900/50"
              style={{ 
                animation: 'fade-in-up 0.8s ease-out forwards',
                animationDelay: `${index * 0.1}s`,
                opacity: 0
              }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-indigo-400" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover gradient effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
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
      `}</style>
    </section>
  )
}
