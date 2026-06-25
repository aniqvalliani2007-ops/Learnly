export const Footer = () => {
  return (
    <footer className="bg-black relative z-10 w-full pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="h-8 w-8 bg-primary flex items-center justify-center text-white text-sm font-black rounded-lg">L</span>
              <span className="text-xl font-bold tracking-tight text-white font-sans">Learnly</span>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed pr-4">
              The smart, study-specific operating system you've been waiting for.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-white mb-6">Product</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#features" className="text-neutral-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-neutral-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#faq" className="text-neutral-400 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-white mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Learnly, Inc.</p>
          <div className="flex gap-6 font-medium">
            <span className="hover:text-white cursor-pointer transition-colors">Security</span>
            <span className="hover:text-white cursor-pointer transition-colors">System Status</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

