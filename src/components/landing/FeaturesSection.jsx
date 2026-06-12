import { Sparkles, Brain, CheckSquare, MessageSquare, TrendingUp, GitFork } from 'lucide-react'

export const FeaturesSection = () => {
  const features = [
    {
      title: 'AI Summaries',
      description: 'Condense complex textbooks and multi-page research papers into clear, structured takeaways.',
      icon: Sparkles,
      color: 'text-indigo-400',
      ui: (
        <div className="mt-6 p-2.5 rounded-[2px] bg-zinc-900/40 border border-white/[0.04] space-y-2">
          <div className="flex gap-2">
            <span className="text-[10px] font-mono text-zinc-500">SUMMARY:</span>
            <div className="h-3 w-16 bg-indigo-500/10 border border-indigo-500/20 rounded-[2px]" />
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full bg-white/[0.06] rounded-[1px]" />
            <div className="h-1.5 w-11/12 bg-white/[0.06] rounded-[1px]" />
            <div className="h-1.5 w-5/6 bg-white/[0.06] rounded-[1px]" />
          </div>
        </div>
      )
    },
    {
      title: 'Active Flashcards',
      description: 'Generate study cards automatically from key definitions and study notes to build memory retention.',
      icon: Brain,
      color: 'text-purple-400',
      ui: (
        <div className="mt-6 flex gap-2">
          <div className="flex-1 p-2 rounded-[2px] bg-zinc-900/40 border border-white/[0.04] text-[9px] text-zinc-500 flex flex-col justify-between h-14">
            <span>FRONT</span>
            <span className="text-zinc-300 text-[10px] font-medium leading-none">Photosynthesis formula</span>
          </div>
          <div className="flex-1 p-2 rounded-[2px] bg-indigo-500/10 border border-indigo-500/20 text-[9px] text-indigo-400 flex flex-col justify-between h-14">
            <span>REVERSE</span>
            <span className="text-indigo-200 text-[10px] font-medium leading-none">6CO₂ + 6H₂O → Glucose + 6O₂</span>
          </div>
        </div>
      )
    },
    {
      title: 'AI Quizzes',
      description: 'Test your understanding with custom-generated multiple-choice questions matching your uploaded content.',
      icon: CheckSquare,
      color: 'text-blue-400',
      ui: (
        <div className="mt-6 p-2.5 rounded-[2px] bg-zinc-900/40 border border-white/[0.04] space-y-1.5 text-[10px]">
          <div className="flex justify-between text-[9px] text-zinc-500">
            <span>Quiz Complete</span>
            <span className="text-emerald-400 font-bold">85% Score</span>
          </div>
          <div className="w-full bg-zinc-950 h-2 rounded-[2px] overflow-hidden p-[1px] border border-white/[0.05]">
            <div className="bg-emerald-500 h-full rounded-[1px]" style={{ width: '85%' }} />
          </div>
        </div>
      )
    },
    {
      title: 'Chat with PDF',
      description: 'Interact directly with your textbook. Ask questions, clarify equations, and seek explanations instantly.',
      icon: MessageSquare,
      color: 'text-amber-400',
      ui: (
        <div className="mt-6 space-y-2">
          <div className="p-2 rounded-[2px] bg-zinc-900/40 border border-white/[0.04] text-[10px] text-zinc-400 text-right ml-4">
            What is cellular respiration?
          </div>
          <div className="p-2 rounded-[2px] bg-indigo-500/10 border border-indigo-500/20 text-[10px] text-indigo-200 mr-4 flex gap-1.5">
            <Sparkles className="h-3 w-3 text-indigo-400 flex-shrink-0 mt-0.5" />
            <span>Process of breaking down glucose into ATP energy...</span>
          </div>
        </div>
      )
    },
    {
      title: 'Progress Tracking',
      description: 'Visualize your academic goals. Keep track of what files you have summarized, practiced, and mastered.',
      icon: TrendingUp,
      color: 'text-emerald-400',
      ui: (
        <div className="mt-6 p-2.5 rounded-[2px] bg-zinc-900/40 border border-white/[0.04] flex items-center justify-between text-[10px] text-zinc-300">
          <div className="space-y-1">
            <span>Weekly Study Goal</span>
            <div className="text-[11px] font-bold text-white">4.8h / 6.0h</div>
          </div>
          <span className="h-8 w-8 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center font-bold text-[9px] text-emerald-400">80%</span>
        </div>
      )
    },
    {
      title: 'Mind Maps',
      description: 'Render complex topics visually to trace the connections between concepts and chapters.',
      icon: GitFork,
      color: 'text-rose-400',
      ui: (
        <div className="mt-6 p-2 rounded-[2px] bg-zinc-900/40 border border-white/[0.04] h-14 flex items-center justify-center relative overflow-hidden">
          <div className="flex items-center gap-3 relative z-10 text-[9px] font-medium text-zinc-300">
            <span className="px-1.5 py-0.5 bg-zinc-950 border border-white/[0.08] rounded-[2px]">Photosynthesis</span>
            <span className="text-zinc-600">⟶</span>
            <div className="flex flex-col gap-1">
              <span className="px-1.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-[2px] scale-90">Light reactions</span>
              <span className="px-1.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-[2px] scale-90">Calvin cycle</span>
            </div>
          </div>
        </div>
      )
    },
  ]

  return (
    <section id="features" className="py-24 border-b border-white/[0.06] relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-20">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Core Capabilities</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2 tracking-tight">
            Supercharge your study workflow with AI-driven toolsets
          </h2>
          <p className="mt-4 text-zinc-400 text-sm leading-relaxed">
            Standard learning platforms display static resources. Learnly transforms reading materials into dynamic, custom study ecosystems that adapt to you.
          </p>
        </div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div 
                key={index} 
                className="glass-card p-6 rounded-[4px] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between h-full relative group"
              >
                <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-white/[0.01] to-transparent pointer-events-none" />
                <div>
                  <div className="inline-flex items-center justify-center p-2 bg-zinc-900 border border-zinc-800 rounded-[4px] mb-6">
                    <Icon className={`h-5 w-5 ${feature.color}`} />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2 font-display tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">{feature.description}</p>
                </div>
                
                {/* Feature specific UI component */}
                {feature.ui}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

