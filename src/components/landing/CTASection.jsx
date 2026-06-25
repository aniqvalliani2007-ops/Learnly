import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export const CTASection = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-black">
      {/* Background glowing orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-sans text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6 leading-[1.1]"
        >
          Spend 50% less time <br /> on the stuff you hate.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-neutral-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto"
        >
          Stop struggling with static notes. Let Learnly automate your flashcards, summarize your lectures, and build custom quizzes in seconds.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto"
        >
          <Link to="/signup" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-primary hover:bg-orange-600 text-white text-base font-bold px-10 py-5 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(217,98,38,0.3)]">
              Start Learning Free
            </button>
          </Link>
          <Link to="/login" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 text-base font-bold px-10 py-5 rounded-full transition-all">
              Sign In
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection

