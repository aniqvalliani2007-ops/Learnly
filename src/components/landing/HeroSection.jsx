import { Sparkles, ArrowRight, FileText, MessageSquare, Brain } from 'lucide-react'
import { Link } from 'react-router-dom'

export const HeroSection = () => {
  const handleScrollToHowItWorks = (e) => {
    e.preventDefault()
    const element = document.getElementById('how-it-works')
    if (element) {
      const yOffset = -80 // Offset to keep headings clear of the sticky navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <section className="relative pt-20 pb-28 border-b border-white/[0.06] overflow-hidden">
      {/* Grid line framing characteristic of Attio style */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 z-0 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-zinc-900 border border-zinc-800 text-[11px] font-medium text-zinc-300 uppercase tracking-wider mb-8 shadow-sm">
            <Sparkles className="h-3 w-3 text-indigo-400 animate-pulse" />
            <span>AI-Powered Active Learning</span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            Transform your PDFs <br className="hidden sm:inline" />
            into <span className="bg-gradient-to-r from-zinc-200 via-white to-zinc-400 text-transparent bg-clip-text">interactive study guides</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base md:text-lg text-zinc-400 max-w-2xl mx-auto font-sans leading-relaxed">
            Upload lecture notes, textbooks, or research papers. Learnly's AI instantly constructs smart summaries, automated flashcards, and custom practice quizzes.
          </p>

          {/* Call to Actions */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/signup">
              <button className="flex items-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-semibold px-5 py-2.5 rounded-[4px] border border-white/20 transition-all shadow-md group">
                Start Learning Free
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Link>
            <a href="#how-it-works" onClick={handleScrollToHowItWorks}>
              <button className="bg-white/[0.03] hover:bg-white/[0.07] text-zinc-300 text-xs font-semibold px-5 py-2.5 rounded-[4px] border border-white/[0.08] transition-all">
                See How It Works
              </button>
            </a>
          </div>
        </div>

        {/* Product Mockup UI (Attio-style Glassy Dashboard) */}
        <div className="mt-20 max-w-5xl mx-auto relative group">
          {/* Glassy border layout wrapping the mockup */}
          <div className="absolute -inset-px bg-gradient-to-t from-white/10 to-transparent opacity-30 blur-sm group-hover:opacity-45 transition-opacity rounded-[4px]" />
          
          <div className="relative glass-card rounded-[4px] overflow-hidden border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {/* Window bar */}
            <div className="h-9 bg-zinc-950/90 border-b border-white/[0.06] flex items-center justify-between px-4">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-zinc-800" />
                <span className="w-2 h-2 rounded-full bg-zinc-800" />
                <span className="w-2 h-2 rounded-full bg-zinc-800" />
              </div>
              <div className="text-[10px] text-zinc-500 font-mono">learnly-workspace-main.pdf</div>
              <div className="w-8" />
            </div>

            {/* Simulated App Grid Workspace */}
            <div className="grid grid-cols-12 h-[340px] md:h-[420px] bg-zinc-950/60 font-sans text-xs">
              {/* Sidebar: 2 cols */}
              <div className="col-span-2 border-r border-white/[0.05] p-3 hidden sm:flex flex-col gap-4 text-zinc-500 font-medium">
                <div className="flex items-center gap-1.5 text-zinc-200">
                  <span className="h-4 w-4 rounded-[2px] bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-[10px] text-indigo-400 font-bold">L</span>
                  <span>Workspace</span>
                </div>
                <div className="space-y-1">
                  <div className="px-2 py-1.5 bg-white/[0.03] text-zinc-300 rounded-[2px] flex items-center gap-2">
                    <FileText className="h-3 w-3 text-zinc-400" />
                    <span>My PDFs</span>
                  </div>
                  <div className="px-2 py-1.5 hover:text-zinc-300 rounded-[2px] flex items-center gap-2 cursor-pointer transition-colors">
                    <Brain className="h-3 w-3 text-zinc-500" />
                    <span>Quizzes</span>
                  </div>
                  <div className="px-2 py-1.5 hover:text-zinc-300 rounded-[2px] flex items-center gap-2 cursor-pointer transition-colors">
                    <MessageSquare className="h-3 w-3 text-zinc-500" />
                    <span>AI Assistant</span>
                  </div>
                </div>
              </div>

              {/* PDF Viewer Mockup: 6 cols */}
              <div className="col-span-12 sm:col-span-6 p-4 flex flex-col gap-3 border-r border-white/[0.05]">
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-2 text-[10px] text-zinc-500">
                  <span>Biology_Ch4_Photosynthesis.pdf</span>
                  <span>Page 1 of 18</span>
                </div>
                
                <div className="space-y-2.5 overflow-hidden">
                  <div className="h-4 bg-white/[0.08] w-2/3 rounded-[2px]" />
                  <div className="space-y-1.5">
                    <div className="h-3 bg-white/[0.04] w-full rounded-[2px]" />
                    <div className="h-3 bg-white/[0.04] w-full rounded-[2px]" />
                    <div className="h-3 bg-white/[0.04] w-5/6 rounded-[2px]" />
                    <div className="h-auto bg-indigo-500/10 border border-indigo-500/20 text-[10px] text-indigo-350 px-2 py-1.5 w-11/12 rounded-[2px] flex items-start gap-1.5">
                      <Sparkles className="h-3 w-3 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span>Highlight: Light-dependent reactions capture energy from sunlight...</span>
                    </div>
                    <div className="h-3 bg-white/[0.04] w-full rounded-[2px]" />
                    <div className="h-3 bg-white/[0.04] w-4/5 rounded-[2px]" />
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/[0.05] space-y-2">
                    <div className="h-4 bg-white/[0.08] w-1/3 rounded-[2px]" />
                    <div className="h-3 bg-white/[0.04] w-full rounded-[2px]" />
                    <div className="h-3 bg-white/[0.04] w-full rounded-[2px]" />
                  </div>
                </div>
              </div>

              {/* AI Study Panel Mockup: 4 cols */}
              <div className="col-span-12 sm:col-span-4 p-4 flex flex-col gap-4 bg-zinc-950/20">
                <div className="flex items-center gap-1.5 border-b border-white/[0.05] pb-2">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                  <span className="font-semibold text-zinc-200">Study Assistant</span>
                </div>

                <div className="flex-1 flex flex-col gap-3 justify-between">
                  {/* Generated Quiz Card */}
                  <div className="bg-zinc-900 border border-white/[0.06] p-3 rounded-[2px] space-y-2 shadow-sm">
                    <div className="flex justify-between items-center text-[9px] text-indigo-400 uppercase font-bold tracking-wider">
                      <span>Practice Quiz</span>
                      <span className="px-1.5 py-0.5 rounded-[2px] bg-indigo-500/10 border border-indigo-500/20">Q1 of 5</span>
                    </div>
                    <p className="text-zinc-200 font-medium text-[11px] leading-snug">What is the primary function of chlorophyll in photosynthesis?</p>
                    <div className="space-y-1 mt-1 text-[10px]">
                      <div className="px-2 py-1 rounded-[2px] bg-zinc-950 border border-white/[0.05] text-zinc-400 hover:text-white cursor-pointer transition-colors">A. To produce oxygen gas</div>
                      <div className="px-2 py-1 rounded-[2px] bg-indigo-500/10 border border-indigo-500/30 text-indigo-200">B. To absorb light energy from the sun</div>
                      <div className="px-2 py-1 rounded-[2px] bg-zinc-950 border border-white/[0.05] text-zinc-400 hover:text-white cursor-pointer transition-colors">C. To convert water into glucose</div>
                    </div>
                  </div>

                  {/* Ask Question Input */}
                  <div className="border border-white/[0.06] bg-zinc-900/60 p-1.5 rounded-[2px] flex items-center justify-between gap-2">
                    <span className="text-zinc-500 px-1 text-[10px]">Ask the AI about page 1...</span>
                    <button className="h-5 px-2 bg-indigo-600 text-[9px] font-semibold text-white rounded-[2px] hover:bg-indigo-500 transition-colors">Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

