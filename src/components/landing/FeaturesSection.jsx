import { motion } from 'framer-motion'
import { Sparkles, Brain, CheckSquare, MessageSquare } from 'lucide-react'

export const FeaturesSection = () => {
  const features = [
    {
      title: 'Optimize studying and retention',
      description: 'Condense complex textbooks and multi-page research papers into clear, structured takeaways. Automatically generate study cards from key definitions to build memory retention.',
      icon: Sparkles,
      ui: (
        <div className="w-full h-full bg-zinc-950 rounded-[4px] border border-white/5 p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px]" />
          <div className="space-y-4 relative z-10">
            <div className="flex gap-2 items-center">
              <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">Flashcard Deck</span>
              <div className="h-3 w-16 bg-white/5 border border-white/10 rounded-[2px]" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-black/50 p-4 rounded-[4px] border border-white/5">
                <div className="text-[10px] text-neutral-500 mb-2 font-mono">FRONT</div>
                <div className="text-xs text-white font-medium leading-relaxed">Photosynthesis formula</div>
              </div>
              <div className="bg-primary/5 p-4 rounded-[4px] border border-primary/20">
                <div className="text-[10px] text-primary mb-2 font-mono">REVERSE</div>
                <div className="text-xs text-white font-medium leading-relaxed">6CO₂ + 6H₂O → Glucose + 6O₂</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Process concepts faster with AI',
      description: 'Test your understanding with custom-generated multiple-choice questions matching your uploaded content. Interact directly with your textbook, ask questions, and seek explanations instantly.',
      icon: Brain,
      ui: (
        <div className="w-full h-full bg-zinc-950 rounded-[4px] border border-white/5 p-6 flex flex-col relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-500/10 rounded-full blur-[50px]" />
          <div className="relative z-10 flex flex-col h-full justify-center space-y-4">
            <div className="p-4 rounded-[4px] bg-black/50 border border-white/5 self-end w-4/5">
              <p className="text-xs text-neutral-300">What is cellular respiration?</p>
            </div>
            <div className="p-4 rounded-[4px] bg-primary/5 border border-primary/20 self-start w-4/5 flex gap-3">
              <Brain className="w-4 h-4 text-primary shrink-0" />
              <p className="text-xs text-white leading-relaxed">It's the process where cells break down glucose into ATP energy, releasing carbon dioxide and water as byproducts.</p>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <section id="features" className="py-24 bg-black relative">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="font-sans text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.1]"
          >
            Simplify studying, practice, <br/> and analytics
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 text-base md:text-lg text-neutral-400 font-sans"
          >
            Optimize your academic workflow and grasp complex topics instantly.
          </motion.p>
        </div>

        {/* Feature Blocks */}
        <div className="space-y-16">
          {features.map((feature, index) => {
            const isEven = index % 2 === 0
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 lg:gap-16`}
              >
                {/* Text Content */}
                <div className="flex-1 space-y-5">
                  <div className="w-10 h-10 rounded-[4px] bg-white/5 flex items-center justify-center border border-white/10">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{feature.title}</h3>
                  <p className="text-neutral-400 text-sm md:text-base leading-relaxed">{feature.description}</p>
                  <button className="text-primary font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all mt-2">
                    Find out more <span className="text-lg">→</span>
                  </button>
                </div>

                {/* UI Graphic */}
                <div className="flex-1 w-full h-[300px] relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-[4px] p-px">
                    {feature.ui}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

