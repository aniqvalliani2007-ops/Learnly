import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import {
  Users,
  FileText,
  TrendingUp,
  ShieldCheck,
  LogOut,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Search,
  Activity,
  Lock,
} from 'lucide-react'

// ─── Hardcoded admin credentials ────────────────────────────────────────────
const ADMIN_EMAIL    = 'admin@learnly.app'
const ADMIN_PASSWORD = 'Learnly@Admin2025'
// ─────────────────────────────────────────────────────────────────────────────

function StatCard({ icon, label, value, sub, color = 'indigo' }) {
  const colors = {
    indigo: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    amber:   'text-amber-400  bg-amber-500/10  border-amber-500/20',
    rose:    'text-rose-400   bg-rose-500/10   border-rose-500/20',
  }
  return (
    <div className="bg-zinc-950/60 border border-white/[0.06] rounded-[6px] p-5 flex items-start gap-4">
      <div className={`h-10 w-10 rounded-[4px] border flex items-center justify-center flex-shrink-0 ${colors[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">{label}</p>
        <p className="text-2xl font-bold text-white font-display mt-0.5">{value}</p>
        {sub && <p className="text-[11px] text-zinc-500 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

// ─── Login screen ─────────────────────────────────────────────────────────────
function AdminLogin({ onLogin }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        sessionStorage.setItem('admin_auth', 'true')
        onLogin()
      } else {
        setError('Invalid admin credentials.')
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      <div className="w-full max-w-[400px] bg-zinc-950 border border-white/[0.08] rounded-[6px] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
        <div className="text-center mb-8">
          <div className="h-10 w-10 bg-white rounded-[4px] flex items-center justify-center text-black font-black text-sm mx-auto mb-4">L</div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-[10px] font-mono text-rose-400 uppercase tracking-widest mb-3">
            <Lock className="h-2.5 w-2.5" /> Admin Access
          </div>
          <h1 className="text-xl font-bold text-white font-display">Admin Dashboard</h1>
          <p className="text-[12px] text-zinc-500 mt-1">Restricted — authorised personnel only</p>
        </div>

        {error && (
          <div className="p-3 rounded-[4px] bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-zinc-900 border border-white/[0.08] focus:border-indigo-500/50 text-sm text-white placeholder-zinc-600 px-4 py-2.5 rounded-[4px] outline-none transition-all"
              placeholder="admin@learnly.app"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-white/[0.08] focus:border-indigo-500/50 text-sm text-white placeholder-zinc-600 px-4 py-2.5 rounded-[4px] outline-none transition-all"
              placeholder="••••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-white hover:bg-zinc-200 text-black text-sm font-semibold rounded-[4px] transition-all mt-2 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Sign In to Admin'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Main dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate               = useNavigate()
  const [authed, setAuthed]    = useState(sessionStorage.getItem('admin_auth') === 'true')
  const [users, setUsers]      = useState([])
  const [loading, setLoading]  = useState(false)
  const [search, setSearch]    = useState('')
  const [expanded, setExpanded] = useState(null)
  const [refreshed, setRefreshed] = useState(0)

  const totalUsers   = users.length
  const totalUploads = users.reduce((s, u) => s + (u.lifetime_uploads || 0), 0)
  const atLimit      = users.filter(u => (u.lifetime_uploads || 0) >= 3).length
  const activeToday  = users.filter(u => {
    const d = new Date(u.last_sign_in || u.created_at)
    return Date.now() - d.getTime() < 86400000
  }).length

  useEffect(() => {
    if (!authed) return
    fetchData()
  }, [authed, refreshed])

  const fetchData = async () => {
    setLoading(true)
    try {
      // Try to fetch from RPC function first (needs to be created in Supabase)
      let allAuthUsers = []
      
      // Attempt to call admin RPC to get all users
      const { data: rpcUsers, error: rpcError } = await supabase.rpc('admin_get_all_users')
      
      if (!rpcError && rpcUsers) {
        allAuthUsers = rpcUsers
        console.log(`✅ Fetched ${allAuthUsers.length} users from auth via RPC`)
      } else {
        console.warn('⚠️ RPC function not available, falling back to upload-based users')
      }

      // Fetch upload counts
      const { data: counts = [] } = await supabase
        .from('user_upload_counts')
        .select('*')

      // Fetch all uploads
      const { data: uploads = [] } = await supabase
        .from('uploads')
        .select('id, user_id, file_name, file_size, created_at, status')
        .order('created_at', { ascending: false })

      // Build comprehensive user map
      const userMap = {}

      // Priority 1: Add ALL users from auth (if RPC worked)
      allAuthUsers.forEach(authUser => {
        userMap[authUser.user_id] = {
          user_id: authUser.user_id,
          email: authUser.email || 'No email',
          full_name: authUser.full_name || null,
          lifetime_uploads: 0,
          last_sign_in: authUser.last_sign_in_at || authUser.created_at,
          created_at: authUser.created_at,
          uploads: [],
        }
      })

      // Priority 2: Merge upload counts (contains email/name for users who uploaded)
      counts.forEach(c => {
        if (userMap[c.user_id]) {
          // Update existing entry with upload count
          userMap[c.user_id].lifetime_uploads = c.total_uploads || 0
          if (!userMap[c.user_id].email || userMap[c.user_id].email === 'No email') {
            userMap[c.user_id].email = c.email || userMap[c.user_id].email
          }
          if (!userMap[c.user_id].full_name) {
            userMap[c.user_id].full_name = c.full_name
          }
        } else {
          // User not in auth list (shouldn't happen, but add them)
          userMap[c.user_id] = {
            user_id: c.user_id,
            email: c.email || 'No email',
            full_name: c.full_name || null,
            lifetime_uploads: c.total_uploads || 0,
            last_sign_in: c.updated_at,
            created_at: c.created_at,
            uploads: [],
          }
        }
      })

      // Priority 3: Attach actual upload files to users
      uploads.forEach(up => {
        if (userMap[up.user_id]) {
          userMap[up.user_id].uploads.push(up)
        } else {
          // Orphaned upload (user deleted from auth but upload exists)
          userMap[up.user_id] = {
            user_id: up.user_id,
            email: 'Deleted user',
            full_name: null,
            lifetime_uploads: 0,
            last_sign_in: up.created_at,
            created_at: up.created_at,
            uploads: [up],
          }
        }
      })

      // Sort by most recent activity
      const userList = Object.values(userMap).sort((a, b) =>
        new Date(b.last_sign_in || b.created_at || 0) - new Date(a.last_sign_in || a.created_at || 0)
      )

      console.log(`📊 Total users in dashboard: ${userList.length}`)
      setUsers(userList)
    } catch (err) {
      console.error('❌ Admin fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    navigate('/')
  }

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />

  const filtered = users.filter(u =>
    (u.email || u.user_id).toLowerCase().includes(search.toLowerCase()) ||
    (u.full_name || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-300 font-sans">

      {/* Top Nav */}
      <div className="border-b border-white/[0.05] bg-zinc-950 px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-7 w-7 rounded-[4px] bg-white text-black font-black flex items-center justify-center text-[13px]">L</span>
          <span className="text-sm font-semibold text-white font-display">Learnly</span>
          <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-[9px] font-mono text-rose-400 uppercase tracking-widest">
            <ShieldCheck className="h-2.5 w-2.5" /> Admin
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setRefreshed(r => r + 1)}
            className="p-2 hover:bg-white/[0.05] rounded-[4px] transition-colors text-zinc-400 hover:text-white"
            title="Refresh"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors border border-white/[0.06] hover:border-white/20 px-3 py-1.5 rounded-[4px]"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">

        {/* Page title */}
        <div>
          <h1 className="text-2xl font-bold text-white font-display tracking-tight">Admin Overview</h1>
          <p className="text-xs text-zinc-500 mt-1 font-mono">Learnly platform — user activity & upload usage</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<Users className="h-5 w-5" />}     label="Total Users"      value={totalUsers}   color="indigo" />
          <StatCard icon={<FileText className="h-5 w-5" />}  label="Total Uploads"    value={totalUploads} color="emerald" sub="all time, cumulative" />
          <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Active Today"    value={activeToday}  color="amber" sub="signed in last 24h" />
          <StatCard icon={<Activity className="h-5 w-5" />}  label="At Upload Limit"  value={atLimit}      color="rose" sub="on free plan (3/3)" />
        </div>

        {/* User table */}
        <div className="space-y-3">
          {/* Table header + search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-white">All Users</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by email or name..."
                className="bg-zinc-950 border border-white/[0.08] text-xs text-white placeholder-zinc-600 pl-9 pr-4 py-2 rounded-[4px] outline-none focus:border-indigo-500/40 transition-all w-full sm:w-64"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-6 w-6 border-2 border-t-indigo-500 border-white/10 rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-zinc-600 text-xs font-mono italic">
              No users found.
            </div>
          ) : (
            <div className="border border-white/[0.06] rounded-[6px] overflow-hidden divide-y divide-white/[0.04]">
              {/* Column headers */}
              <div className="grid grid-cols-12 gap-2 px-4 py-2.5 bg-zinc-900/40 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                <div className="col-span-5">User</div>
                <div className="col-span-2 text-center">Lifetime</div>
                <div className="col-span-2 text-center">Current</div>
                <div className="col-span-2 text-center">Status</div>
                <div className="col-span-1"></div>
              </div>

              {filtered.map(u => {
                const isExpanded    = expanded === u.user_id
                const lifetime      = u.lifetime_uploads || 0
                const current       = u.uploads.length
                const atMax         = lifetime >= 3
                const displayName   = u.full_name || u.email || u.user_id.slice(0, 8) + '...'
                const displayEmail  = u.email || '—'
                const joined        = u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'

                return (
                  <div key={u.user_id}>
                    {/* Row */}
                    <div className="grid grid-cols-12 gap-2 px-4 py-3 items-center hover:bg-white/[0.02] transition-colors">
                      {/* User info */}
                      <div className="col-span-5 flex items-center gap-2.5 min-w-0">
                        <div className="h-7 w-7 rounded-full bg-zinc-800 border border-white/[0.06] flex items-center justify-center text-[11px] font-bold text-zinc-300 flex-shrink-0 uppercase">
                          {(u.full_name || u.email || '?')[0]}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-white font-medium truncate">{displayName}</p>
                          <p className="text-[10px] text-zinc-500 truncate">{displayEmail}</p>
                          <p className="text-[9px] text-zinc-600 font-mono">Joined {joined}</p>
                        </div>
                      </div>

                      {/* Lifetime uploads */}
                      <div className="col-span-2 text-center">
                        <span className="text-sm font-bold text-white font-mono">{lifetime}</span>
                        <p className="text-[9px] text-zinc-600 font-mono">lifetime</p>
                      </div>

                      {/* Current (not deleted) uploads */}
                      <div className="col-span-2 text-center">
                        <span className="text-sm font-mono text-zinc-300">{current}</span>
                        <p className="text-[9px] text-zinc-600 font-mono">active files</p>
                      </div>

                      {/* Status badge */}
                      <div className="col-span-2 flex justify-center">
                        {atMax ? (
                          <span className="px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-[9px] font-bold text-rose-400 uppercase tracking-wider whitespace-nowrap">
                            At Limit
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400 uppercase tracking-wider whitespace-nowrap">
                            {lifetime} / 3
                          </span>
                        )}
                      </div>

                      {/* Expand toggle */}
                      <div className="col-span-1 flex justify-end">
                        <button
                          onClick={() => setExpanded(isExpanded ? null : u.user_id)}
                          className="p-1 hover:bg-white/[0.05] rounded-[3px] transition-colors text-zinc-500 hover:text-white"
                        >
                          {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Expanded file list */}
                    {isExpanded && (
                      <div className="px-4 pb-4 bg-zinc-900/20">
                        <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-2 pt-2">
                          Active Documents ({current})
                        </p>
                        {current === 0 ? (
                          <p className="text-xs text-zinc-600 italic">All files deleted by user.</p>
                        ) : (
                          <div className="space-y-1.5">
                            {u.uploads.map(file => (
                              <div key={file.id} className="flex items-center justify-between gap-2 px-3 py-2 bg-zinc-950/60 rounded-[3px] border border-white/[0.04]">
                                <div className="flex items-center gap-2 min-w-0">
                                  <FileText className="h-3.5 w-3.5 text-zinc-500 flex-shrink-0" />
                                  <span className="text-xs text-zinc-300 truncate">{file.file_name}</span>
                                </div>
                                <div className="flex items-center gap-3 text-[10px] text-zinc-600 font-mono flex-shrink-0">
                                  <span>{Math.round(file.file_size / 1024)} KB</span>
                                  <span className={`px-1.5 py-0.5 rounded-[2px] text-[9px] font-bold uppercase border ${
                                    file.status === 'done'
                                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                      : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                                  }`}>
                                    {file.status}
                                  </span>
                                  <span>{new Date(file.created_at).toLocaleDateString()}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
