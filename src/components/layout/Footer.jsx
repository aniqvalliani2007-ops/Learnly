export const Footer = () => {
  return (
    <footer className="bg-black relative z-10 w-full border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo and tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <span className="h-8 w-8 bg-white flex items-center justify-center text-black text-sm font-black rounded-[2px]">L</span>
              <span className="text-xl font-bold tracking-tight text-white font-sans">Learnly</span>
            </div>
            <p className="text-zinc-500 text-sm">
              The home for smarter learning
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="text-zinc-500 hover:text-white transition-colors">About</a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-8 pt-8 text-center text-sm text-zinc-600">
          <p>&copy; {new Date().getFullYear()} Learnly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

