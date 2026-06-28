import Navbar from './Navbar'
import Footer from './Footer'

export const LandingLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans antialiased selection:bg-primary/30 selection:text-white">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default LandingLayout

