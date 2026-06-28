import { useEffect, useRef } from 'react'

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Medical Student",
    text: "Learnly has been the best study tool I've ever used. The AI-generated summaries and flashcards have directly helped me ace my exams. It's like having a personal tutor available 24/7."
  },
  {
    name: "David Chen",
    role: "Engineering Student",
    text: "I've never seen a more effective study platform. The quiz generation is incredibly accurate and helps me identify exactly what I need to focus on."
  },
  {
    name: "Emma Rodriguez",
    role: "Law Student",
    text: "The instant study guides feature has genuinely changed my study routine. It's helped me become more efficient and deeply engaged with complex legal materials."
  },
  {
    name: "Michael Brown",
    role: "Business Student",
    text: "Learnly is the highest ROI tool for students. Imagine having instant summaries and quizzes for every document you need to study. That's Learnly."
  },
  {
    name: "Olivia Martinez",
    role: "Psychology Student",
    text: "The flashcard system is brilliant. I can review key concepts anywhere, anytime. It's made studying actually enjoyable."
  },
  {
    name: "James Wilson",
    role: "Computer Science Student",
    text: "Learnly is far more than just a study app; it's a complete learning system. The AI assistant understands context and provides relevant explanations."
  },
  {
    name: "Sophie Taylor",
    role: "Biology Student",
    text: "I've tried many study tools, but Learnly stands out. The quality of AI-generated content is exceptional, and it saves me hours every week."
  },
  {
    name: "Alex Kumar",
    role: "MBA Candidate",
    text: "Learnly gave me permission to study smarter, not harder. The personalized quizzes help me focus on weak areas and track my progress effectively."
  },
]

export default function TestimonialsSection() {
  const scrollRef = useRef(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let scrollAmount = 0
    const scroll = () => {
      scrollAmount += 0.5
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0
      }
      scrollContainer.scrollLeft = scrollAmount
    }

    const interval = setInterval(scroll, 30)
    return () => clearInterval(interval)
  }, [])

  // Duplicate testimonials for seamless loop
  const doubledTestimonials = [...testimonials, ...testimonials]

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 opacity-50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center space-y-4">
          <p className="text-sm text-zinc-600 uppercase tracking-[0.2em]">TESTIMONIALS</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            LOVED BY STUDENTS
          </h2>
        </div>
      </div>

      {/* Scrolling testimonials */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-hidden py-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {doubledTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[400px] bg-zinc-950/50 border border-zinc-800 rounded-lg p-8 backdrop-blur-sm"
            >
              <p className="text-zinc-300 text-base leading-relaxed mb-6">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-zinc-500 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
