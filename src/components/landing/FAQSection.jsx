import { useState } from 'react'
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
    <section id="faq" className="py-24 border-b border-white/[0.06] relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">HELP SYSTEM</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-zinc-400 text-sm leading-relaxed max-w-md mx-auto">
            Everything you need to know about the Learnly platform, plans, and features.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index
            return (
              <div 
                key={index} 
                className="glass-card rounded-[4px] border border-white/[0.08] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-xs font-semibold text-white font-display tracking-tight">{faq.q}</span>
                  {isOpen ? (
                    <Minus className="h-3.5 w-3.5 text-zinc-400 flex-shrink-0 ml-4" />
                  ) : (
                    <Plus className="h-3.5 w-3.5 text-zinc-400 flex-shrink-0 ml-4" />
                  )}
                </button>
                
                {/* Content with transition height */}
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-40 pb-5 pt-1' : 'max-h-0'
                  }`}
                >
                  <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                    {faq.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQSection

