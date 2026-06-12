import { UploadCloud, Compass, BookOpen } from 'lucide-react'

export const HowItWorks = () => {
  const steps = [
    {
      step: '01',
      title: 'Upload Your PDF',
      description: 'Drag and drop or select any PDF file. Textbooks, lecture slide collections, or research briefs, up to 50MB.',
      icon: UploadCloud,
      visual: (
        <div className="mt-8 p-4 rounded-[2px] bg-zinc-950 border border-white/[0.05] border-dashed text-center flex flex-col items-center justify-center min-h-[110px]">
          <UploadCloud className="h-5 w-5 text-indigo-400 mb-2" />
          <span className="text-[10px] text-zinc-400 font-medium">drop_your_textbook.pdf here</span>
          <span className="text-[9px] text-zinc-600 mt-1">supports text-based PDFs</span>
        </div>
      )
    },
    {
      step: '02',
      title: 'Configure Study Space',
      description: 'Choose which study methods you want. Toggle between chat assistant, automated quizzes, summaries, or flashcards.',
      icon: Compass,
      visual: (
        <div className="mt-8 grid grid-cols-2 gap-2 text-[10px]">
          <div className="p-2 rounded-[2px] bg-indigo-500/10 border border-indigo-500/35 text-indigo-200 flex items-center justify-between font-medium">
            <span>Quizzes</span>
            <span className="text-[9px] bg-indigo-400/20 text-indigo-300 px-1 py-0.2 rounded-[2px]">ON</span>
          </div>
          <div className="p-2 rounded-[2px] bg-zinc-900 border border-white/[0.04] text-zinc-400 flex items-center justify-between">
            <span>Summaries</span>
            <span className="text-[9px] text-zinc-600">OFF</span>
          </div>
          <div className="p-2 rounded-[2px] bg-indigo-500/10 border border-indigo-500/35 text-indigo-200 flex items-center justify-between font-medium">
            <span>Flashcards</span>
            <span className="text-[9px] bg-indigo-400/20 text-indigo-300 px-1 py-0.2 rounded-[2px]">ON</span>
          </div>
          <div className="p-2 rounded-[2px] bg-indigo-500/10 border border-indigo-500/35 text-indigo-200 flex items-center justify-between font-medium">
            <span>Chat AI</span>
            <span className="text-[9px] bg-indigo-400/20 text-indigo-300 px-1 py-0.2 rounded-[2px]">ON</span>
          </div>
        </div>
      )
    },
    {
      step: '03',
      title: 'Engage & Excel',
      description: 'Review summaries, take quizzes, run through flashcards, and ask questions to master the materials in half the time.',
      icon: BookOpen,
      visual: (
        <div className="mt-8 p-3 rounded-[2px] bg-zinc-950 border border-white/[0.04] space-y-2">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-zinc-300 font-medium">Biology Quiz Result</span>
            <span className="text-emerald-450 font-mono font-bold">100% PASS</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[9px] text-zinc-500">
              <span className="h-3 w-3 bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold rounded-[2px]">✓</span>
              <span>Perfect recall on photosynthesis terms</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] text-zinc-500">
              <span className="h-3 w-3 bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold rounded-[2px]">✓</span>
              <span>All 15 flashcards mastered today</span>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <section id="how-it-works" className="py-24 border-b border-white/[0.06] relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Simple Integration</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2 tracking-tight">
            How Learnly operates
          </h2>
          <p className="mt-4 text-zinc-400 text-sm leading-relaxed max-w-lg mx-auto">
            Three simple steps to unlock interactive, high-retention study materials custom tailored to your courses.
          </p>
        </div>

        {/* Steps Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (desktop only) */}
          <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-zinc-800/10 via-zinc-800 to-zinc-800/10 z-0" />
          
          {steps.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-14 w-14 rounded-[4px] bg-zinc-950 border border-white/[0.08] flex items-center justify-center relative shadow-inner">
                      <Icon className="h-5 w-5 text-indigo-400" />
                      <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-[4px] bg-zinc-900 border border-zinc-800 text-[9px] font-bold text-zinc-400 flex items-center justify-center font-mono">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white font-display tracking-tight">{item.title}</h3>
                      <span className="text-[10px] text-zinc-500 uppercase font-mono">Step {index + 1}</span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans pr-4">{item.description}</p>
                </div>
                {item.visual}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

