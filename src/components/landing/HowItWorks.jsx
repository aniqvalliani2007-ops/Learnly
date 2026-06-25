import { motion } from 'framer-motion'
import { UploadCloud, Settings2, BookOpen } from 'lucide-react'

export const HowItWorks = () => {
  const steps = [
    {
      title: 'Upload Your Material',
      description: 'Drag and drop any PDF file. Textbooks, lecture slide collections, or research briefs, up to 50MB.',
      icon: UploadCloud,
    },
    {
      title: 'Configure AI Extraction',
      description: 'Choose which study methods you want. Toggle between chat assistant, automated quizzes, summaries, or flashcards.',
      icon: Settings2,
    },
    {
      title: 'Engage & Excel',
      description: 'Review summaries, take quizzes, run through flashcards, and ask questions to master the materials in half the time.',
      icon: BookOpen,
    }
  ]

  return (
    <section id="how-it-works" className="py-24 bg-zinc-950 border-y border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-sans text-3xl md:text-5xl font-bold text-white tracking-tight"
          >
            How Learnly operates
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 text-base md:text-lg text-neutral-400 font-sans max-w-2xl mx-auto"
          >
            Three simple steps to unlock interactive, high-retention study materials custom tailored to your courses.
          </motion.p>
        </div>

        {/* Steps Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black border border-white/5 p-8 rounded-[4px] relative overflow-hidden group hover:border-primary/50 transition-colors"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] group-hover:bg-primary/20 transition-colors" />
                
                <div className="w-12 h-12 rounded-[4px] bg-zinc-900 border border-white/10 flex items-center justify-center mb-8 relative z-10">
                  <Icon className="h-5 w-5 text-primary" />
                  <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white tracking-tight mb-3 relative z-10">{item.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed relative z-10">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

