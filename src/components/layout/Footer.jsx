export const Footer = () => {
  return (
    <footer className="bg-black relative z-10 w-full border-t border-white/10 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-8 w-8 bg-white flex items-center justify-center text-black text-sm font-black rounded-sm">L</span>
              <span className="text-lg font-bold tracking-tight text-white font-sans">Learnly</span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Transform your study materials into interactive learning experiences.
            </p>
          </div>
          
          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#features" className="text-zinc-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-zinc-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#faq" className="text-zinc-400 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-zinc-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-zinc-400 hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-sm text-zinc-500">
          <p>&copy; {new Date().getFullYear()} Learnly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

