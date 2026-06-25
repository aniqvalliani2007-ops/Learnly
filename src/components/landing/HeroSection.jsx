import { ArrowRight, Play, BookOpen, Layers, CheckCircle2, FileText, Upload, Sparkles, LogOut, Check } from 'lucide-react'
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
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.98, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.8, 1])

  return (
    <section ref={containerRef} className="relative pt-16 pb-24 overflow-hidden flex flex-col items-center w-full bg-black">
      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Animated Pill Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-zinc-900 border border-white/5 text-[11px] font-medium text-zinc-300 tracking-wide mb-6 uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            The intelligent platform for modern learning
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="font-sans text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]"
          >
            The system that knows <br className="hidden md:block" /> learning like you do.
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="mt-5 text-base md:text-lg text-neutral-400 max-w-2xl mx-auto font-sans leading-relaxed"
          >
            Far from just another study tool, Learnly is the all-in-one operating system designed specifically to transform your study materials into interactive mastery.
          </motion.p>

          {/* Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto"
          >
            <Link to="/signup" className="w-full sm:w-auto">
              <button className="w-full flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-black text-sm font-semibold px-6 py-2.5 rounded-[2px] transition-all">
                Start Learning Free
              </button>
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto">
              <button className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold px-6 py-2.5 rounded-[2px] border border-white/5 transition-all">
                <Play className="w-3.5 h-3.5" />
                See it in action
              </button>
            </a>
          </motion.div>
        </div>

        {/* Parallax Mockup UI - exact dashboard clone */}
        <motion.div 
          style={{ y, scale, opacity }}
          className="mt-16 w-full max-w-6xl mx-auto relative group z-20 perspective-[2000px]"
        >
          <div className="absolute -inset-1 bg-white/5 blur-[30px] opacity-20 pointer-events-none" />
          
          <div className="relative rounded-[4px] overflow-hidden border border-white/10 shadow-2xl flex flex-col bg-zinc-950 h-[500px] md:h-[600px] text-left">
            
            {/* Window header */}
            <div className="h-8 bg-zinc-950 border-b border-white/5 flex items-center px-4 w-full shrink-0">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              </div>
            </div>

            <div className="flex-1 flex flex-row overflow-hidden bg-black text-white font-sans text-sm">
              
              {/* Left Sidebar */}
              <div className="w-[240px] flex-shrink-0 border-r border-white/5 flex flex-col bg-[#050505] hidden md:flex">
                <div className="p-4 flex items-center gap-2 border-b border-white/5">
                  <span className="w-6 h-6 bg-white flex items-center justify-center text-black text-xs font-black rounded-[2px]">L</span>
                  <span className="font-bold tracking-tight text-[13px]">Learnly Workspace</span>
                </div>
                
                <div className="p-4">
                  <button className="w-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs py-2 rounded-[2px] flex items-center justify-center gap-2">
                    <PlusIcon className="w-4 h-4" /> Upload PDF
                  </button>
                  
                  <div className="mt-6 flex justify-between text-[9px] text-neutral-500 font-mono uppercase font-bold tracking-wider mb-2">
                    <span>Free Usage</span>
                    <span>1 / 1 uploads</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-primary" />
                  </div>

                  <div className="mt-8 text-[9px] text-neutral-500 font-mono uppercase font-bold tracking-wider mb-2">
                    MY DOCUMENTS
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-[2px] p-2 flex items-center gap-2 cursor-pointer">
                    <FileText className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs text-white truncate font-medium">lab 13 and 14.pdf</span>
                  </div>
                </div>

                <div className="mt-auto p-4 border-t border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-neutral-400">SV</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate">saif valliani</div>
                    <div className="text-[9px] text-neutral-500 font-mono uppercase">Student Account</div>
                  </div>
                  <LogOut className="w-4 h-4 text-neutral-500 cursor-pointer hover:text-white transition-colors" />
                </div>
              </div>

              {/* Middle Panel - Document */}
              <div className="flex-1 border-r border-white/5 bg-[#0a0a0a] flex flex-col min-w-0">
                <div className="h-[45px] border-b border-white/5 flex items-center px-4 shrink-0 gap-2 overflow-x-auto">
                  <FileText className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-[13px] font-semibold text-white whitespace-nowrap">lab 13 and 14.pdf</span>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-[2px] text-neutral-400 whitespace-nowrap">PDF Reader</span>
                    <span className="text-[10px] text-neutral-500 whitespace-nowrap">375 KB</span>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 lg:p-10 relative">
                  <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded-[2px] text-neutral-400 font-mono tracking-widest uppercase mb-6 inline-block">Document Workspace</span>
                  
                  <h2 className="text-2xl md:text-3xl font-bold mb-8">lab 13 and 14.pdf</h2>
                  
                  <div className="flex gap-6 border-b border-white/5 mb-6 text-xs font-semibold tracking-wide">
                    <div className="border-b-2 border-white pb-2 cursor-pointer">STUDY GUIDE</div>
                    <div className="text-neutral-500 pb-2 cursor-pointer">DOCUMENT TEXT (11K CHARS)</div>
                  </div>

                  <div className="flex items-center gap-4 text-[11px] mb-8 font-mono">
                    <div className="flex items-center gap-1.5 text-neutral-400">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      Difficulty: <span className="bg-primary/20 text-primary px-1.5 rounded-[2px] font-bold">INTERMEDIATE</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-400">
                      <Check className="w-3 h-3" />
                      Estimated Read Time: <span className="text-white font-bold">8 min</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-neutral-500 font-mono uppercase font-bold tracking-widest mb-3">
                    Summary Overview
                  </div>
                  <div className="border border-white/5 bg-white/[0.02] rounded-[4px] p-5 text-[13px] text-neutral-300 leading-relaxed">
                    This document details two laboratory exercises for an Operating Systems course. Lab 13 focuses on shell programming in Unix/Linux, covering the fundamentals of shells, shell scripts, their creation, execution, and the use of control structures like if-elif-else statements, for loops, and while loops. It also introduces basic arithmetic operations using 'expr' and 'bc', and input/output handling with 'echo' and 'read'. Lab 14 addresses the classic Dining Philosopher's Problem, a synchronization challenge in operating systems. It explains how to implement a solution using POSIX threads and semaphores in C to prevent deadlock and race conditions by managing concurrent access to shared resources (forks) among multiple processes (philosophers).
                  </div>

                  <div className="text-[10px] text-neutral-500 font-mono uppercase font-bold tracking-widest mt-8 mb-3">
                    Key Takeaways
                  </div>
                  <div className="border border-white/5 bg-white/[0.02] rounded-[4px] h-20" />
                </div>
              </div>

              {/* Right Panel - Assistant */}
              <div className="w-[300px] flex-shrink-0 flex flex-col bg-[#050505] hidden lg:flex">
                <div className="h-[45px] border-b border-white/5 flex items-center px-4 shrink-0 gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-[13px] font-bold text-white">Study Assistant</span>
                </div>

                <div className="flex border-b border-white/5 text-[10px] font-bold tracking-wider font-mono">
                  <div className="flex-1 py-3 text-center border-b-2 border-white bg-white/5">SUMMARY</div>
                  <div className="flex-1 py-3 text-center text-neutral-500">FLASHCARDS</div>
                  <div className="flex-1 py-3 text-center text-neutral-500">QUIZ</div>
                  <div className="flex-1 py-3 text-center text-neutral-500">CHAT</div>
                </div>

                <div className="flex-1 overflow-y-auto p-5 relative">
                  <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 mb-4">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3 h-3" /> 8 min read
                    </div>
                    <span className="text-primary font-bold">INTERMEDIATE</span>
                  </div>

                  <p className="text-[12px] text-neutral-300 leading-relaxed mb-6">
                    This document details two laboratory exercises for an Operating Systems course. Lab 13 focuses on shell programming in Unix/Linux, covering the fundamentals of shells, shell scripts, their creation, execution, and the use of control structures like if-elif-else statements, for loops, and while loops. It also introduces basic arithmetic operations using 'expr' and 'bc', and input/output handling with 'echo' and 'read'. Lab 14 addresses the classic Dining Philosopher's Problem, a synchronization challenge in operating systems. It explains how to implement a solution using POSIX threads and semaphores in C to prevent deadlock and race conditions by managing concurrent access to shared resources (forks) among multiple processes (philosophers).
                  </p>

                  <div className="text-[9px] text-neutral-500 font-mono uppercase font-bold tracking-widest mb-3">
                    Key Takeaways
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-[11px] text-neutral-400 leading-snug">
                      <div className="w-3 h-3 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2 h-2 text-emerald-500" />
                      </div>
                      Shell scripting involves using interpreters to automate tasks and execute commands sequentially.
                    </li>
                    <li className="flex items-start gap-2 text-[11px] text-neutral-400 leading-snug">
                      <div className="w-3 h-3 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2 h-2 text-emerald-500" />
                      </div>
                      Shell scripts require a shebang line (#!/bin/sh) to specify the interpreter and are often saved with a .sh extension.
                    </li>
                    <li className="flex items-start gap-2 text-[11px] text-neutral-400 leading-snug">
                      <div className="w-3 h-3 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2 h-2 text-emerald-500" />
                      </div>
                      Shell scripting supports variables, user input (read).
                    </li>
                  </ul>

                  {/* Absolute positioning bottom floating tag */}
                  <div className="fixed bottom-4 right-4 bg-zinc-900 border border-white/10 px-2 py-1 rounded-[2px] flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono shadow-xl z-50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Diagnostics & Logs (0)
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function PlusIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

export default HeroSection

