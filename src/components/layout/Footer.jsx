export const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/[0.06] relative z-10 w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-5 w-5 bg-white flex items-center justify-center text-black text-[10px] font-black rounded-[3px]">L</span>
              <span className="text-sm font-bold tracking-tight text-white font-display">Learnly</span>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-[200px]">
              AI-powered learning tools crafted for modern, active student workflows.
            </p>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest font-mono mb-4">Product</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#features" className="text-zinc-500 hover:text-zinc-300 transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-zinc-500 hover:text-zinc-300 transition-colors">Pricing</a></li>
              <li><a href="#faq" className="text-zinc-500 hover:text-zinc-300 transition-colors">FAQ Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest font-mono mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors">About Us</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors">Blog</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors">Press Kit</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest font-mono mb-4">Legal</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-zinc-300 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/[0.05] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-500 font-mono">
          <p>&copy; {new Date().getFullYear()} Learnly Inc. All rights reserved.</p>
          <p className="flex gap-4">
            <span className="hover:text-zinc-400 cursor-pointer">Security</span>
            <span>&bull;</span>
            <span className="hover:text-zinc-400 cursor-pointer">Status</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

