import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth()
  const location = useLocation()
  
  const isDashboard = location.pathname.startsWith('/dashboard')

  const handleScrollToSection = (e, id) => {
    e.preventDefault()
    
    // If not on homepage, navigate to homepage with hash first
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`
      return
    }

    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80 // Offset to keep section headings clear of the sticky navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  if (isDashboard) {
    return (
      <nav className="border-b border-zinc-200 bg-white sticky top-0 z-50 h-16">
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
          <Link to="/" className="text-xl font-bold tracking-tight font-sans text-zinc-950 flex items-center gap-2">
            <span className="h-8 w-8 bg-zinc-950 flex items-center justify-center text-white text-sm font-black rounded-lg">L</span>
            Learnly
          </Link>
          <div className="flex gap-4 items-center">
            <Link to="/dashboard">
              <button className="text-sm font-semibold bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-2 rounded-full transition-colors">
                Dashboard
              </button>
            </Link>
            <button 
              onClick={logout}
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 px-4 py-2 rounded-full border border-transparent hover:border-zinc-200 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="glass-header sticky top-0 z-50 h-20 w-full transition-all">
      <div className="max-w-6xl mx-auto px-6 h-full flex justify-between items-center">
        <div className="flex items-center gap-10">
          <Link to="/" className="text-xl font-bold tracking-tight font-sans text-white flex items-center gap-2">
            <span className="h-8 w-8 bg-primary flex items-center justify-center text-white text-sm font-black rounded-lg">L</span>
            Learnly
          </Link>
          
          <div className="hidden md:flex gap-8 items-center">
            <a 
              href="#features" 
              onClick={(e) => handleScrollToSection(e, 'features')}
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              onClick={(e) => handleScrollToSection(e, 'how-it-works')}
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              How it Works
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => handleScrollToSection(e, 'pricing')}
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a 
              href="#faq" 
              onClick={(e) => handleScrollToSection(e, 'faq')}
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              FAQ
            </a>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <button className="text-sm font-semibold bg-white hover:bg-neutral-200 text-black px-6 py-2.5 rounded-full transition-all">
                  Dashboard
                </button>
              </Link>
              <button 
                onClick={logout} 
                className="text-sm font-medium text-neutral-400 hover:text-white px-4 py-2 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden sm:block">
                <button className="text-sm font-medium text-neutral-400 hover:text-white px-4 py-2 transition-colors">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="text-sm font-semibold bg-primary hover:bg-orange-600 text-white px-6 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(217,98,38,0.2)] hover:scale-105 active:scale-95">
                  Book a demo
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

