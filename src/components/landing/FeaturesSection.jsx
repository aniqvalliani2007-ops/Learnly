import { Brain, Zap, MessageSquare, FileText, BarChart3, Clock } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: "AI-Powered Summaries",
    description: "Get instant, comprehensive summaries of any document with our advanced AI technology."
  },
  {
    icon: FileText,
    title: "Smart Flashcards",
    description: "Automatically generated flashcards that help you memorize key concepts effectively."
  },
  {
    icon: Zap,
    title: "Interactive Quizzes",
    description: "Test your knowledge with AI-generated quizzes tailored to your study materials."
  },
  {
    icon: MessageSquare,
    title: "Study Assistant",
    description: "Ask questions and get instant answers about your documents anytime, anywhere."
  },
  {
    icon: Clock,
    title: "Instant Processing",
    description: "Upload and process documents in seconds. Start studying immediately without delays."
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Monitor your learning progress with detailed analytics and performance insights."
  }
]

export default function FeaturesSection() {
  return (
    <section id="features" className="relative w-full py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6 w-full">
        
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything You Need to Excel
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Powerful features designed to transform the way you study
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-sm transition-all hover:bg-white/[0.07]"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6 text-indigo-400" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
