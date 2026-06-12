import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import LandingLayout from '../../components/layout/index.jsx'
import { ArrowRight, Lock, Mail } from 'lucide-react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signup(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Error creating account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <LandingLayout>
      <div className="flex-1 flex items-center justify-center py-20 px-6 relative z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        
        {/* Glowing aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] glow-orb pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)' }} />

        <div className="w-full max-w-[420px] glass-card p-10 rounded-[4px] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
          
          {/* Logo Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <span className="h-9 w-9 bg-white flex items-center justify-center text-black text-sm font-black rounded-[4px] mx-auto mb-5 shadow-sm hover:scale-105 transition-transform">L</span>
            </Link>
            <h1 className="font-display text-2xl font-bold text-white tracking-tight">Create your account</h1>
            <p className="text-[13px] text-zinc-400 font-sans mt-2">Get started with 5 free document uploads.</p>
          </div>

          {error && (
            <div className="p-3 rounded-[4px] bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 font-medium mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2 font-semibold">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/[0.08] hover:border-white/20 focus:border-indigo-500/50 text-sm text-white placeholder-zinc-600 pl-11 pr-4 py-3 rounded-[4px] outline-none transition-all"
                  placeholder="name@university.edu"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2 font-semibold">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/[0.08] hover:border-white/20 focus:border-indigo-500/50 text-sm text-white placeholder-zinc-600 pl-11 pr-4 py-3 rounded-[4px] outline-none transition-all"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-3 px-5 bg-white hover:bg-zinc-200 text-black text-sm font-semibold rounded-[4px] transition-all flex items-center justify-center gap-1.5 mt-8 disabled:opacity-50 disabled:cursor-not-allowed group"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
              {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
            </button>
          </form>

          <p className="text-xs text-zinc-400 text-center mt-6 font-sans">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </LandingLayout>
  )
}

