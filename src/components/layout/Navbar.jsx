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
      <nav className="border-b border-zinc-200 bg-white sticky top-0 z-50 h-14">
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
          <Link to="/" className="text-lg font-bold tracking-tight font-display text-zinc-950 flex items-center gap-2">
            <span className="h-6 w-6 bg-zinc-950 flex items-center justify-center text-white text-xs font-black rounded-[4px]">L</span>
            Learnly
          </Link>
          <div className="flex gap-3 items-center">
            <Link to="/dashboard">
              <button className="text-[13px] font-medium bg-zinc-900 hover:bg-zinc-800 text-white px-3.5 py-1.5 rounded-[4px] border border-zinc-950 transition-colors">
                Dashboard
              </button>
            </Link>
            <button 
              onClick={logout}
              className="text-[13px] font-medium text-zinc-600 hover:text-zinc-900 px-3 py-1.5 rounded-[4px] border border-transparent hover:border-zinc-200 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="border-b border-white/[0.06] bg-[#080808]/75 backdrop-blur-md sticky top-0 z-50 h-14 w-full">
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-lg font-bold tracking-tight font-display text-white flex items-center gap-2">
            <span className="h-6 w-6 bg-white flex items-center justify-center text-black text-xs font-black rounded-[4px]">L</span>
            Learnly
          </Link>
          
          <div className="hidden md:flex gap-6 items-center">
            <a 
              href="#features" 
              onClick={(e) => handleScrollToSection(e, 'features')}
              className="text-[13px] font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              onClick={(e) => handleScrollToSection(e, 'how-it-works')}
              className="text-[13px] font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              How it Works
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => handleScrollToSection(e, 'pricing')}
              className="text-[13px] font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Pricing
            </a>
            <a 
              href="#faq" 
              onClick={(e) => handleScrollToSection(e, 'faq')}
              className="text-[13px] font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              FAQ
            </a>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <button className="text-[13px] font-medium bg-white hover:bg-zinc-200 text-zinc-950 px-3.5 py-1.5 rounded-[4px] border border-white/20 transition-all shadow-sm">
                  Dashboard
                </button>
              </Link>
              <button 
                onClick={logout} 
                className="text-[13px] font-medium text-zinc-400 hover:text-white px-3 py-1.5 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="text-[13px] font-medium text-zinc-400 hover:text-white px-3 py-1.5 transition-colors">
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button className="text-[13px] font-medium bg-white hover:bg-zinc-200 text-zinc-950 px-3.5 py-1.5 rounded-[4px] border border-white/20 transition-all shadow-[0_1px_2px_rgba(255,255,255,0.05)]">
                  Start Free
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

