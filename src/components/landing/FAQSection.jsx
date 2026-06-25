import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

export const FAQSection = () => {
  const faqs = [
    { 
      q: 'What file formats are supported?', 
      a: 'We currently support PDF files of up to 50MB. This includes textbooks, research documents, lecture slides, scanned articles, and notes. The PDF must have readable text layers for the AI model to perform summaries and quiz creation.' 
    },
    { 
      q: 'How accurate are the AI summaries and quizzes?', 
      a: 'Our models are powered by state-of-the-art Large Language Models fine-tuned on educational content. The summaries extract the absolute core definitions, while the practice quizzes are custom-aligned to the textbook pages you select, ensuring extremely high factual precision.' 
    },
    { 
      q: 'Is there a free trial plan?', 
      a: 'Yes, our Basic Free plan provides 5 document uploads per month, access to summary tools, self-study flashcards, and basic chat assistant capabilities. No credit card is required to sign up.' 
    },
    { 
      q: 'Can I cancel my subscription anytime?', 
      a: 'Absolutely. If you sign up for our Pro Student plan, you can cancel, upgrade, or downgrade your membership directly from your account dashboard. Upon cancellation, you will keep your Pro benefits until the end of your billing cycle.' 
    },
  ]

  const [activeIndex, setActiveIndex] = useState(null)

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24 bg-black border-y border-white/5 relative">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-sans text-3xl md:text-5xl font-bold text-white tracking-tight"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index
            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-zinc-900/50 rounded-[4px] border border-white/5 overflow-hidden"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-base font-bold text-white font-sans tracking-tight pr-6">{faq.q}</span>
                  <div className={`shrink-0 w-6 h-6 rounded-[2px] flex items-center justify-center transition-colors ${isOpen ? 'bg-primary text-white' : 'bg-white/5 text-neutral-400'}`}>
                    {isOpen ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1">
                        <p className="text-neutral-400 text-sm leading-relaxed font-sans">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQSection

