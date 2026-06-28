import { Upload, Brain, Target, TrendingUp } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    number: "01",
    title: "Upload Your Document",
    description: "Simply drag and drop your PDF or upload it directly. Supports any study material."
  },
  {
    icon: Brain,
    number: "02",
    title: "AI Processing",
    description: "Our advanced AI analyzes your document and extracts key concepts automatically."
  },
  {
    icon: Target,
    number: "03",
    title: "Study Materials Generated",
    description: "Get instant summaries, flashcards, and quizzes tailored to your content."
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Learn & Track Progress",
    description: "Study with interactive materials and monitor your improvement over time."
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Get started in minutes with our simple 4-step process
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-px bg-gradient-to-r from-white/20 to-transparent"></div>
              )}
              
              <div className="relative text-center">
                {/* Number badge */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-sm bg-white/5 backdrop-blur-xl border border-white/10 text-zinc-500 font-bold text-sm mb-6">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 mx-auto rounded-sm bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-5">
                  <step.icon className="w-8 h-8 text-indigo-400" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
