import { Star } from 'lucide-react'

export const TestimonialsSection = () => {
  const testimonials = [
    { 
      name: 'Johnathan K.', 
      role: 'Pre-Med Student, NYU',
      text: "Learnly helped me digest 60-page physiology chapters in minutes. The automated flashcard generation cut my active recall prep time by more than half.",
      stars: 5,
    },
    { 
      name: 'Sarah M.', 
      role: 'Law School Candidate',
      text: "The AI summaries are incredibly precise. It extracts key legal arguments and definitions accurately, making case briefings much more structured.",
      stars: 5,
    },
    { 
      name: 'Michael T.', 
      role: 'CS Undergraduate',
      text: "Best academic utility I have added to my study suite. Generating practice quiz sets directly from lecture slide decks is a complete game-changer.",
      stars: 5,
    },
  ]

  return (
    <section className="py-24 border-b border-white/[0.06] relative">
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">User Proof</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2 tracking-tight">
            What student scholars say
          </h2>
          <p className="mt-4 text-zinc-400 text-sm leading-relaxed">
            Thousands of students use Learnly weekly to study more effectively and test their comprehension.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-[4px] border border-white/[0.08] flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                {/* Text */}
                <p className="text-zinc-300 text-xs leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              {/* Author */}
              <div className="mt-6 pt-4 border-t border-white/[0.05] flex flex-col">
                <span className="text-xs font-bold text-white font-display">{item.name}</span>
                <span className="text-[10px] text-zinc-500 font-mono mt-0.5">{item.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection

