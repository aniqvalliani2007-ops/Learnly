import { Star } from 'lucide-react'

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Medical Student",
    avatar: "SJ",
    rating: 5,
    text: "Learnly has completely transformed how I study. The AI-generated summaries save me hours every week, and the flashcards are perfect for memorization."
  },
  {
    name: "Michael Chen",
    role: "Engineering Student",
    avatar: "MC",
    rating: 5,
    text: "The quiz feature is incredible. It helps me identify weak areas and focus my study time where it matters most. Best study tool I've ever used."
  },
  {
    name: "Emma Rodriguez",
    role: "Law Student",
    avatar: "ER",
    rating: 5,
    text: "Being able to ask questions about my documents and get instant answers is a game-changer. It's like having a personal tutor available 24/7."
  },
  {
    name: "David Kim",
    role: "Business Student",
    avatar: "DK",
    rating: 5,
    text: "The progress tracking keeps me motivated. I can see my improvement over time and it encourages me to stay consistent with my studies."
  },
  {
    name: "Jessica Martinez",
    role: "Psychology Student",
    avatar: "JM",
    rating: 5,
    text: "Simple, fast, and incredibly effective. I can't imagine studying without Learnly now. It's become an essential part of my daily routine."
  },
  {
    name: "Alex Thompson",
    role: "Computer Science Student",
    avatar: "AT",
    rating: 5,
    text: "The AI is surprisingly accurate. It extracts exactly what I need to know and presents it in a way that's easy to understand and remember."
  }
]

export default function TestimonialsSection() {
  return (
    <section className="relative w-full py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6 w-full">
        
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Loved by Students
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Join thousands of students who are learning smarter with Learnly
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-sm hover:bg-white/[0.07] transition-all"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-indigo-400 text-indigo-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-zinc-300 leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{testimonial.name}</div>
                  <div className="text-zinc-500 text-xs">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
