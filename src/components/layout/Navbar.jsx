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
      const yOffset = -60
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  if (isDashboard) {
    return (
      <nav className="border-b border-zinc-200 bg-white sticky top-0 z-50 h-14">
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
          <Link to="/" className="text-[15px] font-semibold tracking-tight font-sans text-zinc-950 flex items-center gap-2">
            <span className="h-6 w-6 bg-zinc-950 flex items-center justify-center text-white text-xs font-black rounded-[2px]">L</span>
            Learnly
          </Link>
          <div className="flex gap-4 items-center">
            <Link to="/dashboard">
              <button className="text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-1.5 rounded-[2px] transition-colors">
                Dashboard
              </button>
            </Link>
            <button 
              onClick={logout}
              className="text-xs font-medium text-zinc-600 hover:text-zinc-900 px-3 py-1.5 rounded-[2px] border border-transparent hover:border-zinc-200 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="glass-header sticky top-0 z-50 h-14 w-full transition-all">
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        <div className="flex items-center gap-10">
          <Link to="/" className="text-base font-semibold tracking-tight font-sans text-white flex items-center gap-2">
            <span className="h-6 w-6 bg-white flex items-center justify-center text-black text-xs font-black rounded-sm">L</span>
            Learnly
          </Link>
          
          <div className="hidden md:flex gap-6 items-center">
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

        <div className="flex gap-3 items-center">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <button className="text-sm font-medium bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 text-white px-4 py-2 rounded-sm transition-all">
                  Dashboard
                </button>
              </Link>
              <button 
                onClick={logout} 
                className="text-sm font-medium text-neutral-400 hover:text-white px-3 py-2 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden sm:block">
                <button className="text-sm font-medium text-neutral-400 hover:text-white px-3 py-2 transition-colors">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="text-sm font-medium bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 text-white px-4 py-2 rounded-sm transition-all">
                  Get Started
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

