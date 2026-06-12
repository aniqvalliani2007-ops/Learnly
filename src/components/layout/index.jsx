import Navbar from './Navbar'
import Footer from './Footer'

export const LandingLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#080808] text-zinc-300 font-sans antialiased selection:bg-white/10 selection:text-white relative overflow-hidden">
      {/* Background glowing decorations */}
      <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] glow-orb pointer-events-none" />
      <div className="absolute top-[60%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] glow-orb pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] glow-orb pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(147, 51, 234, 0.06) 0%, transparent 70%)' }} />
      
      {/* Background Dot pattern overlay */}
      <div className="absolute inset-0 bg-dot-pattern opacity-100 pointer-events-none z-0" />

      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default LandingLayout

