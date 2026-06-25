import Navbar from './Navbar'
import Footer from './Footer'

export const LandingLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans antialiased selection:bg-primary/30 selection:text-white relative overflow-hidden">
      {/* Background glowing decorations - keeping very subtle */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 w-full flex flex-col items-center">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default LandingLayout

