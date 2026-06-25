import { ArrowRight, Play, BookOpen, Layers, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export const HeroSection = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Parallax effects for the mockup
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.5, 1])

  return (
    <section ref={containerRef} className="relative pt-24 pb-32 overflow-hidden flex flex-col items-center w-full">
      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Animated Pill Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-xs font-medium text-zinc-300 tracking-wide mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            The intelligent platform for modern learning
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="font-sans text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[1.05]"
          >
            The system that knows <br className="hidden md:block" /> learning like you do.
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-sans leading-relaxed"
          >
            Far from just another study tool, Learnly is the all-in-one operating system designed specifically to transform your study materials into interactive mastery.
          </motion.p>

          {/* Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link to="/signup" className="w-full sm:w-auto">
              <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-orange-600 text-white text-base font-semibold px-8 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(217,98,38,0.3)] hover:scale-105 active:scale-95">
                Start Learning Free
              </button>
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto">
              <button className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white text-base font-semibold px-8 py-4 rounded-full border border-white/10 transition-all">
                <Play className="w-4 h-4" />
                See it in action
              </button>
            </a>
          </motion.div>
        </div>

        {/* Parallax Mockup UI */}
        <motion.div 
          style={{ y, scale, opacity }}
          className="mt-24 w-full max-w-5xl mx-auto relative group z-20 perspective-[2000px]"
        >
          {/* Subtle glow behind mockup */}
          <div className="absolute -inset-4 bg-primary/20 blur-[100px] rounded-full opacity-50 pointer-events-none" />
          
          <div className="relative glass-panel rounded-xl overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)] flex flex-col bg-zinc-950">
            {/* Top Bar */}
            <div className="h-12 bg-zinc-900 border-b border-white/10 flex items-center justify-between px-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex bg-black/50 rounded-lg p-1">
                <div className="px-4 py-1 rounded-md bg-zinc-800 text-xs font-medium text-white shadow-sm">Dashboard</div>
                <div className="px-4 py-1 rounded-md text-xs font-medium text-neutral-400">Library</div>
                <div className="px-4 py-1 rounded-md text-xs font-medium text-neutral-400">Analytics</div>
              </div>
              <div className="w-16" /> {/* spacer */}
            </div>

            {/* Dashboard Content Mockup */}
            <div className="h-[400px] md:h-[500px] grid grid-cols-12 gap-px bg-white/5">
              
              {/* Sidebar */}
              <div className="col-span-3 bg-zinc-950 p-6 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Learnly Pro</div>
                    <div className="text-xs text-neutral-500">Workspace</div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Menu</div>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 text-primary">
                    <Layers className="w-4 h-4" />
                    <span className="text-sm font-medium">Courses</span>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-400 hover:text-white transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Quizzes</span>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="col-span-9 bg-black p-8 flex flex-col gap-6">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Welcome back, Alex</h2>
                    <p className="text-neutral-400 text-sm">Here's your learning progress for today.</p>
                  </div>
                  <div className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold">
                    Resume Course
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[1,2,3].map((i) => (
                    <div key={i} className="bg-zinc-900 border border-white/5 rounded-xl p-5 flex flex-col gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-neutral-400" />
                      </div>
                      <div>
                        <div className="text-sm text-neutral-400 mb-1">Module {i}</div>
                        <div className="text-lg font-semibold text-white">Advanced Genetics</div>
                      </div>
                      <div className="w-full bg-black rounded-full h-2 mt-auto">
                        <div className="bg-primary h-full rounded-full" style={{ width: `${i * 30}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection

