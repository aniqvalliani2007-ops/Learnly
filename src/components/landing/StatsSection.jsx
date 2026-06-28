export default function StatsSection() {
  const stats = [
    {
      number: "10K+",
      label: "ACTIVE STUDENTS"
    },
    {
      number: "500K+",
      label: "DOCUMENTS PROCESSED"
    },
    {
      number: "95%",
      label: "SATISFACTION RATE"
    },
    {
      number: "24/7",
      label: "AI ASSISTANCE"
    }
  ]

  return (
    <section className="relative py-32 bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-sm text-zinc-600 uppercase tracking-[0.2em] mb-4">BY THE NUMBERS</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center space-y-4 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white">
                {stat.number}
              </div>
              <div className="text-sm text-zinc-500 font-semibold tracking-[0.15em] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          opacity: 0;
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
