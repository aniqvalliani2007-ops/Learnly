import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export const TestimonialsSection = () => {
  const testimonials = [
    { 
      name: 'Johnathan K.', 
      role: 'Pre-Med Student, NYU',
      text: "I'm happier, my study groups are happier, my grades are higher. It's really been a life changing thing for my medical degree.",
    },
    { 
      name: 'Sarah M.', 
      role: 'Law School Candidate',
      text: "The AI summaries are incredibly precise. It extracts key legal arguments and definitions accurately, making case briefings much more structured.",
    },
    { 
      name: 'Michael T.', 
      role: 'CS Undergraduate',
      text: "Best academic utility I have added to my study suite. Generating practice quiz sets directly from lecture slide decks is a complete game-changer.",
    },
  ]

  return (
    <section className="py-24 bg-black border-y border-white/5 relative overflow-hidden">
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
            Students, in their own words
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 text-base md:text-lg text-neutral-400 font-sans max-w-2xl mx-auto"
          >
            Join thousands of students who have upgraded their academic workflow with Learnly.
          </motion.p>
        </div>

        {/* Glassy Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/[0.02] border border-white/5 p-8 rounded-[4px] relative overflow-hidden flex flex-col justify-between h-full group hover:border-white/10 hover:bg-white/[0.04] transition-all"
            >
              {/* Subtle top glow on hover */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-primary/0 group-hover:bg-primary/50 group-hover:blur-[8px] transition-all duration-500" />
              
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="font-serif text-base md:text-lg text-neutral-300 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col">
                <span className="text-sm font-bold text-white font-sans">{testimonial.name}</span>
                <span className="text-xs text-neutral-500 font-sans mt-1">{testimonial.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection

