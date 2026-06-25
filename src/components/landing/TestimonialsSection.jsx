import { motion } from 'framer-motion'
import { Star, ArrowRight, ArrowLeft } from 'lucide-react'

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
    <section className="py-32 bg-black border-y border-white/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sans text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Students, in their own words
          </motion.h2>
        </div>

        {/* Highlighted Testimonial Area */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-8 flex flex-col justify-center"
          >
            <div className="flex gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            
            <p className="font-serif text-3xl md:text-5xl text-white leading-[1.2] italic tracking-tight">
              "{testimonials[0].text}"
            </p>

            <div className="mt-10 flex flex-col">
              <span className="text-xl font-bold text-white font-sans">{testimonials[0].name}</span>
              <span className="text-sm text-neutral-500 font-sans mt-1">{testimonials[0].role}</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-1 md:col-span-4 flex justify-end items-end h-full"
          >
            <div className="flex gap-3">
              <button className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors group">
                <ArrowLeft className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform" />
              </button>
              <button className="w-14 h-14 rounded-full bg-primary flex items-center justify-center hover:bg-orange-600 transition-colors group">
                <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection

