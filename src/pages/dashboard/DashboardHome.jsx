import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useUpload } from '../../hooks/useUpload'
import { supabase } from '../../lib/supabase'
import { openrouterService } from '../../services/openrouterService'
import { 
  Sparkles, 
  FileText, 
  Brain, 
  MessageSquare, 
  Plus, 
  Trash2, 
  LogOut, 
  Check, 
  ArrowRight, 
  Upload, 
  BookOpen, 
  HelpCircle, 
  Activity, 
  TrendingUp, 
  User,
  ExternalLink,
  ChevronRight,
  Menu,
  X
} from 'lucide-react'

// Beautiful, native React Markdown-to-HTML renderer for assistant responses
function formatAssistantResponse(text) {
  if (!text) return null

  const lines = text.split('\n')
  const elements = []
  let currentList = []
  let currentListType = null // 'bullet' | 'number' | null

  const flushList = (key) => {
    if (currentList.length > 0) {
      if (currentListType === 'bullet') {
        elements.push(
          <ul key={`list-${key}`} className="list-disc ml-5 my-2.5 space-y-1.5 text-zinc-300">
            {currentList}
          </ul>
        )
      } else if (currentListType === 'number') {
        elements.push(
          <ol key={`list-${key}`} className="list-decimal ml-5 my-2.5 space-y-1.5 text-zinc-300">
            {currentList}
          </ol>
        )
      }
      currentList = []
      currentListType = null
    }
  }

  const parseInline = (lineText, lineIdx) => {
    const boldParts = lineText.split('**')
    return boldParts.map((part, partIdx) => {
      if (partIdx % 2 === 1) {
        const italicParts = part.split('*')
        return (
          <strong key={`b-${lineIdx}-${partIdx}`} className="font-bold text-white">
            {italicParts.map((subPart, subIdx) => {
              if (subIdx % 2 === 1) {
                return <em key={`i-${lineIdx}-${partIdx}-${subIdx}`} className="italic text-zinc-150">{subPart}</em>
              }
              return subPart
            })}
          </strong>
        )
      } else {
        const italicParts = part.split('*')
        return italicParts.map((subPart, subIdx) => {
          if (subIdx % 2 === 1) {
            return <em key={`i-${lineIdx}-${partIdx}-${subIdx}`} className="italic text-zinc-150">{subPart}</em>
          }
          return subPart
        })
      }
    })
  }

  lines.forEach((line, index) => {
    const trimmed = line.trim()
    
    // Check if it's a bullet item
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (currentListType && currentListType !== 'bullet') {
        flushList(index)
      }
      currentListType = 'bullet'
      const cleanText = trimmed.substring(2)
      currentList.push(
        <li key={`li-${index}`} className="leading-relaxed">
          {parseInline(cleanText, index)}
        </li>
      )
    }
    // Check if it's a numbered item
    else if (/^\d+\.\s/.test(trimmed)) {
      if (currentListType && currentListType !== 'number') {
        flushList(index)
      }
      currentListType = 'number'
      const cleanText = trimmed.replace(/^\d+\.\s/, '')
      currentList.push(
        <li key={`li-${index}`} className="leading-relaxed">
          {parseInline(cleanText, index)}
        </li>
      )
    }
    // Empty line or paragraph
    else {
      flushList(index)
      if (!trimmed) {
        elements.push(<div key={`spacer-${index}`} className="h-3" />)
      } else {
        elements.push(
          <p key={`p-${index}`} className="my-2 leading-relaxed text-zinc-300">
            {parseInline(line, index)}
          </p>
        )
      }
    }
  })

  // Flush remaining list items
  flushList(lines.length)

  return elements
}

export default function DashboardHome() {
  const { user, logout } = useAuth()
  const { uploadPDF, progress: uploadProgress, loading: isUploading, error: uploadError } = useUpload()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  // Database lists
  const [uploads, setUploads] = useState([])
  const [selectedUploadId, setSelectedUploadId] = useState(null)
  
  // Active document data
  const [selectedUpload, setSelectedUpload] = useState(null)
  const [extractedText, setExtractedText] = useState('')
  const [isExtractingText, setIsExtractingText] = useState(false)
  const [summary, setSummary] = useState(null)
  const [flashcards, setFlashcards] = useState([])
  const [quizzes, setQuizzes] = useState([])
  const [chatMessages, setChatMessages] = useState([])
  const [debugLogs, setDebugLogs] = useState([])
  const [showDebug, setShowDebug] = useState(false)
  
  // Workspace UI Layout Tabs
  const [centerTab, setCenterTab] = useState('summary') // 'summary' | 'source'
  const [isSendingChat, setIsSendingChat] = useState(false)

  useEffect(() => {
    const handleError = (event) => {
      setDebugLogs((prev) => [...prev, {
        type: 'Error',
        message: event.message || 'Unknown error',
        stack: event.error?.stack || '',
        time: new Date().toLocaleTimeString()
      }])
    }

    const handleRejection = (event) => {
      setDebugLogs((prev) => [...prev, {
        type: 'Promise Rejection',
        message: event.reason?.message || String(event.reason),
        stack: event.reason?.stack || '',
        time: new Date().toLocaleTimeString()
      }])
    }

    // Capture console.error
    const originalConsoleError = console.error
    console.error = (...args) => {
      originalConsoleError.apply(console, args)
      const msg = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ')
      setDebugLogs((prev) => [...prev, {
        type: 'Console Error',
        message: msg,
        stack: '',
        time: new Date().toLocaleTimeString()
      }])
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleRejection)
      console.error = originalConsoleError
    }
  }, [])

  // UI States
  const [activeTab, setActiveTab] = useState('summary') // 'summary' | 'flashcards' | 'quiz' | 'chat'
  const [chatInput, setChatInput] = useState('')
  const [flashcardIndex, setFlashcardIndex] = useState(0)
  const [flashcardFlipped, setFlashcardFlipped] = useState(false)
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false)

  const chatEndRef = useRef(null)

  // Fetch initial list of uploads
  const fetchUploads = async () => {
    if (!user) return
    try {
      const { data, error } = await supabase
        .from('uploads')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      if (error) throw error
      setUploads(data || [])
    } catch (err) {
      console.error('Error fetching uploads:', err)
    }
  }

  useEffect(() => {
    fetchUploads()
  }, [user])

  // Sync selected ID from URL params or set default
  useEffect(() => {
    const paramId = searchParams.get('uploadId')
    if (paramId) {
      setSelectedUploadId(paramId)
    } else if (uploads.length > 0 && !selectedUploadId) {
      setSelectedUploadId(uploads[0].id)
    }
  }, [uploads, searchParams])

  // Fetch all details when selected ID changes
  useEffect(() => {
    if (!selectedUploadId) {
      setSelectedUpload(null)
      setExtractedText('')
      setSummary(null)
      setFlashcards([])
      setQuizzes([])
      setChatMessages([])
      return
    }

    const loadData = async () => {
      try {
        // Load upload details
        const { data: upload, error: uploadErr } = await supabase
          .from('uploads')
          .select('*')
          .eq('id', selectedUploadId)
          .single()
        if (uploadErr) throw uploadErr
        setSelectedUpload(upload)

        // Load summary
        const { data: summaryData } = await supabase
          .from('summaries')
          .select('*')
          .eq('upload_id', selectedUploadId)
          .maybeSingle()
        setSummary(summaryData)

        // Load flashcards
        const { data: flashcardsData } = await supabase
          .from('flashcards')
          .select('*')
          .eq('upload_id', selectedUploadId)
        setFlashcards(flashcardsData || [])

        // Load quizzes
        const { data: quizzesData } = await supabase
          .from('quizzes')
          .select('*')
          .eq('upload_id', selectedUploadId)
        setQuizzes(quizzesData || [])

        // Load chat messages
        const { data: chatData } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('upload_id', selectedUploadId)
          .order('created_at', { ascending: true })
        setChatMessages(chatData || [])

        // Reset quiz and flashcard states
        setFlashcardIndex(0)
        setFlashcardFlipped(false)
        setQuizIndex(0)
        setQuizScore(0)
        setQuizFinished(false)
        setSelectedQuizAnswer(null)
        setCenterTab('summary')

        // Download and extract actual PDF text for chat context
        setIsExtractingText(true)
        try {
          const { data: blobData, error: downloadError } = await supabase.storage
            .from('learnly-pdfs')
            .download(upload.storage_path)
          if (!downloadError && blobData) {
            const textContent = await openrouterService.extractTextFromBlob(blobData)
            setExtractedText(textContent)
          }
        } catch (textErr) {
          console.error('Failed to pre-extract text for context chat:', textErr)
        } finally {
          setIsExtractingText(false)
        }
      } catch (err) {
        console.error('Error loading upload workspace:', err)
      }
    }

    loadData()
  }, [selectedUploadId])

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  // Handle file drop/upload
  const handleFileDrop = async (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === 'application/pdf') {
      await uploadFile(droppedFile)
    }
  }

  const handleFileSelect = async (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      await uploadFile(selectedFile)
    }
  }

  const uploadFile = async (targetFile) => {
    try {
      const record = await uploadPDF(targetFile, user.id)
      if (record) {
        setSearchParams({ uploadId: record.id })
        setSelectedUploadId(record.id)
        await fetchUploads()
      }
    } catch (err) {
      console.error('Upload failed:', err)
    }
  }

  // Delete document handler
  const handleDeleteUpload = async (id, e) => {
    e.stopPropagation()
    if (!window.confirm('Are you sure you want to delete this document?')) return
    try {
      const { error } = await supabase.from('uploads').delete().eq('id', id)
      if (error) throw error
      
      const remainingUploads = uploads.filter(u => u.id !== id)
      setUploads(remainingUploads)
      
      if (selectedUploadId === id) {
        if (remainingUploads.length > 0) {
          setSearchParams({ uploadId: remainingUploads[0].id })
          setSelectedUploadId(remainingUploads[0].id)
        } else {
          setSearchParams({})
          setSelectedUploadId(null)
        }
      }
    } catch (err) {
      console.error('Error deleting upload:', err)
    }
  }

  // Handle chat submission
  const handleSendChat = async () => {
    if (!chatInput.trim() || !selectedUploadId || !user || isSendingChat) return
    const userMsg = {
      upload_id: selectedUploadId,
      user_id: user.id,
      role: 'user',
      content: chatInput
    }
    
    setChatMessages(prev => [...prev, userMsg])
    const currentInput = chatInput
    setChatInput('')
    setIsSendingChat(true)

    try {
      await supabase.from('chat_messages').insert(userMsg)

      // Use actual OpenRouter Chat Response with extracted PDF text context
      const context = extractedText || (summary ? summary.overview + ' ' + summary.key_points.join(' ') : 'No context available.')
      const response = await openrouterService.chatResponse(
        selectedUpload.file_name,
        context,
        currentInput,
        chatMessages
      )
      
      const assistantMsg = {
        upload_id: selectedUploadId,
        user_id: user.id,
        role: 'assistant',
        content: response
      }

      await supabase.from('chat_messages').insert(assistantMsg)
      setChatMessages(prev => [...prev, assistantMsg])
    } catch (err) {
      console.error('Error sending message:', err)
    } finally {
      setIsSendingChat(false)
    }
  }

  // Handle quiz question choice
  const handleQuizAnswer = (choice) => {
    if (selectedQuizAnswer !== null) return
    setSelectedQuizAnswer(choice)
    const isCorrect = choice === quizzes[quizIndex].correct_answer
    if (isCorrect) {
      setQuizScore(prev => prev + 1)
    }

    setTimeout(() => {
      if (quizIndex + 1 < quizzes.length) {
        setQuizIndex(prev => prev + 1)
        setSelectedQuizAnswer(null)
      } else {
        setQuizFinished(true)
      }
    }, 1500)
  }

  return (
    <div className="h-screen w-screen bg-[#080808] text-zinc-300 font-sans flex overflow-hidden relative">
      
      {/* Mobile overlay */}
      {(isSidebarOpen || isRightPanelOpen) && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => {
            setIsSidebarOpen(false)
            setIsRightPanelOpen(false)
          }}
        />
      )}
      
      {/* Mobile header bar */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-zinc-950 border-b border-white/[0.05] px-4 flex items-center justify-between z-20 lg:hidden">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-white/[0.05] rounded-[4px] transition-colors"
        >
          <Menu className="h-5 w-5 text-zinc-400" />
        </button>
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-[4px] bg-white text-black font-black flex items-center justify-center text-xs shadow-sm">L</span>
          <span className="font-display text-sm font-semibold tracking-tight text-white">Learnly</span>
        </div>
        <button 
          onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
          className="p-2 hover:bg-white/[0.05] rounded-[4px] transition-colors"
        >
          <Sparkles className="h-5 w-5 text-indigo-400" />
        </button>
      </div>
      
      {/* 1. SIDEBAR PANEL */}
      <aside className={`fixed lg:relative w-[280px] lg:w-[260px] border-r border-white/[0.05] bg-zinc-950 flex flex-col justify-between h-full select-none flex-shrink-0 z-40 transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-5 flex flex-col gap-6 overflow-hidden">
          
          {/* Logo Header */}
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <span className="h-7 w-7 rounded-[4px] bg-white text-black font-black flex items-center justify-center text-[13px] shadow-sm">L</span>
              <span className="font-display text-sm font-semibold tracking-tight text-white">Learnly Workspace</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-white/[0.05] rounded-[4px] transition-colors"
            >
              <X className="h-5 w-5 text-zinc-400" />
            </button>
          </div>

          {/* New upload shortcut */}
          <button 
            onClick={() => {
              setSelectedUploadId(null)
              setSearchParams({})
              setIsSidebarOpen(false)
            }}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-zinc-200 text-black text-sm font-semibold rounded-[4px] transition-all shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Upload PDF</span>
          </button>

          {/* Uploads list container */}
          <div className="flex flex-col gap-3 overflow-hidden">
            <span className="text-[10px] font-mono font-semibold tracking-widest text-zinc-500 uppercase">My Documents</span>
            
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 max-h-[calc(100vh-250px)]">
              {uploads.length === 0 ? (
                <p className="text-xs text-zinc-650 italic px-2 py-3">No PDFs uploaded yet.</p>
              ) : (
                uploads.map(item => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedUploadId(item.id)
                      setSearchParams({ uploadId: item.id })
                      setIsSidebarOpen(false)
                    }}
                    className={`group w-full px-3 py-2.5 rounded-[4px] flex items-center justify-between text-xs font-medium cursor-pointer transition-all ${
                      selectedUploadId === item.id 
                        ? 'bg-white/[0.04] text-white border border-white/[0.05]' 
                        : 'text-zinc-400 hover:bg-white/[0.02] hover:text-zinc-200 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden pr-2">
                      <FileText className={`h-4 w-4 flex-shrink-0 ${selectedUploadId === item.id ? 'text-indigo-400' : 'text-zinc-500'}`} />
                      <span className="truncate text-sm">{item.file_name}</span>
                    </div>
                    <button 
                      onClick={(e) => handleDeleteUpload(item.id, e)}
                      className="opacity-0 group-hover:opacity-100 hover:text-rose-400 p-0.5 rounded transition-opacity"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Profile / Logout at bottom */}
        <div className="p-5 border-t border-white/[0.05] flex flex-col gap-4">
          <div className="flex items-center gap-2.5 px-1 overflow-hidden">
            <div className="h-8 w-8 rounded-full bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-zinc-400">
              <User className="h-4 w-4" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs text-zinc-300 font-medium truncate">{user?.email}</span>
              <span className="text-[9px] font-mono text-zinc-550 uppercase tracking-widest font-semibold">Student Account</span>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2 border border-white/[0.05] hover:bg-white/[0.02] text-zinc-400 hover:text-white text-xs font-medium rounded-[4px] transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. CENTER PANEL (PDF VIEWER OR UPLOAD ZONE) */}
      <main className="flex-1 h-full overflow-hidden flex flex-col border-r border-white/[0.05] z-10 relative pt-14 lg:pt-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

        {selectedUploadId && selectedUpload ? (
          /* WORKSPACE MODE (SELECTED PDF) */
          <div className="flex flex-col h-full overflow-hidden">
            {/* Top Workspace Header */}
            <div className="h-14 border-b border-white/[0.05] px-4 md:px-6 flex items-center justify-between bg-zinc-950/20">
              <div className="flex items-center gap-3 overflow-hidden flex-1 min-w-0">
                <FileText className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                <h2 className="text-xs md:text-sm font-semibold text-white truncate">
                  {selectedUpload.file_name}
                </h2>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-xs text-zinc-550 font-mono flex-shrink-0">
                <span className="px-2 py-0.5 rounded-[2px] bg-zinc-900 border border-white/[0.05] text-zinc-400">PDF Reader</span>
                <span>{Math.round(selectedUpload.file_size / 1024)} KB</span>
              </div>
            </div>

            {/* Document Reader Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-10 lg:p-14 space-y-6 md:space-y-8 max-w-3xl mx-auto scrollbar-thin w-full">
              
              {/* Cover / Header section */}
              <div className="space-y-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-mono text-indigo-350 uppercase tracking-widest font-semibold">
                  <span>Document Workspace</span>
                </div>
                <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  {selectedUpload.file_name}
                </h1>
                
                {/* Content Tabs */}
                <div className="flex border-b border-white/[0.06] gap-3 sm:gap-6 pt-3 overflow-x-auto">
                  <button
                    onClick={() => setCenterTab('summary')}
                    className={`pb-3 text-[10px] sm:text-xs font-mono uppercase tracking-wider font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                      centerTab === 'summary'
                        ? 'border-indigo-500 text-white'
                        : 'border-transparent text-zinc-500 hover:text-zinc-350'
                    }`}
                  >
                    Study Guide
                  </button>
                  <button
                    onClick={() => setCenterTab('source')}
                    className={`pb-3 text-[10px] sm:text-xs font-mono uppercase tracking-wider font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                      centerTab === 'source'
                        ? 'border-indigo-500 text-white'
                        : 'border-transparent text-zinc-500 hover:text-zinc-350'
                    }`}
                  >
                    <span className="hidden sm:inline">Document Text ({Math.round(extractedText.length / 1000)}k chars)</span>
                    <span className="sm:hidden">Text</span>
                  </button>
                </div>
              </div>

              {/* Document Text Content */}
              <div className="space-y-6 text-[15px] leading-relaxed text-zinc-350 font-sans">
                {isExtractingText ? (
                  <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <div className="h-8 w-8 border-2 border-t-indigo-500 border-white/[0.1] rounded-full animate-spin" />
                    <p className="text-sm text-zinc-500 italic font-mono">Reading and parsing PDF content...</p>
                  </div>
                ) : centerTab === 'summary' ? (
                  summary ? (
                    <div className="space-y-8 animate-fadeIn">
                      {/* Meta badge block */}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-[10px] sm:text-xs text-zinc-400 font-mono">
                        <div className="flex items-center gap-1.5">
                          <Activity className="h-3.5 w-3.5 text-zinc-500" />
                          <span>Difficulty:</span>
                          <span className={`px-2 py-0.5 rounded-[2px] text-[10px] font-bold uppercase ${
                            summary.difficulty === 'easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                            summary.difficulty === 'advanced' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                            'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                          }`}>
                            {summary.difficulty || 'Intermediate'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Check className="h-3.5 w-3.5 text-zinc-500" />
                          <span>Estimated Read Time:</span>
                          <span className="text-white font-semibold">{summary.estimated_read_time || 5} min</span>
                        </div>
                      </div>

                      {/* Overview paragraph */}
                      <div className="space-y-3">
                        <h3 className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">Summary Overview</h3>
                        <p className="text-sm sm:text-[15px] leading-relaxed text-zinc-200 font-sans bg-zinc-950/20 p-4 sm:p-6 rounded border border-white/[0.04] shadow-sm">
                          {summary.overview}
                        </p>
                      </div>

                      {/* Key takeaway cards */}
                      <div className="space-y-4">
                        <h3 className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">Key Takeaways</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          {summary.key_points?.map((pt, i) => (
                            <div key={i} className="p-5 bg-zinc-950/40 border border-white/[0.05] rounded-[4px] hover:border-indigo-500/30 hover:bg-zinc-950/60 transition-all text-sm text-zinc-300 flex items-start gap-3 shadow-md">
                              <Sparkles className="h-4.5 w-4.5 text-indigo-400 mt-0.5 flex-shrink-0" />
                              <span className="leading-relaxed font-sans text-zinc-300">{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pillars / Topics covered */}
                      {summary.topics && summary.topics.length > 0 && (
                        <div className="space-y-3 pt-2">
                          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">Focus Core Topics</h3>
                          <div className="flex flex-wrap gap-2.5">
                            {summary.topics.map((topic, i) => (
                              <span key={i} className="px-3 py-1 bg-zinc-900/60 hover:bg-zinc-900 border border-white/[0.06] text-zinc-400 text-xs font-medium rounded-full transition-colors cursor-default">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                      <div className="h-6 w-6 border-2 border-t-indigo-500 border-white/[0.1] rounded-full animate-spin" />
                      <p className="text-sm text-zinc-500 italic font-mono">Compiling summary insights...</p>
                    </div>
                  )
                ) : extractedText ? (
                  <div className="text-[14px] leading-relaxed text-zinc-300 font-sans select-text whitespace-pre-wrap bg-zinc-950/30 p-7 rounded border border-white/[0.04] shadow-sm max-w-none">
                    {extractedText}
                  </div>
                ) : (
                  <p className="text-sm text-zinc-550 italic font-mono">No readable source text extracted from this document.</p>
                )}
              </div>

            </div>
          </div>
        ) : (
          /* UPLOAD MODE (NO PDF SELECTED) */
          <div className="flex-1 flex flex-col p-10 md:p-14 overflow-y-auto">
            <div className="max-w-2xl mx-auto w-full space-y-10">
              
              {/* Greeting */}
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">Study Workspace</h1>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1 font-sans">Upload a document to generate custom study flashcards, quizzes, and AI summaries.</p>
              </div>

              {/* Dotted dropzone */}
              {!isUploading ? (
                <div 
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleFileDrop}
                  className={`border border-dashed p-6 sm:p-8 md:p-12 rounded-[4px] flex flex-col items-center justify-center text-center transition-all ${
                    isDragOver 
                      ? 'border-indigo-500 bg-indigo-500/[0.02]' 
                      : 'border-white/[0.08] bg-zinc-950/40 hover:bg-zinc-950/60'
                  }`}
                >
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-zinc-900 border border-white/[0.06] rounded-[4px] flex items-center justify-center mb-3 sm:mb-4 text-zinc-400">
                    <Upload className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-white">Drag & drop your PDF here</span>
                  <span className="text-[10px] sm:text-xs text-zinc-550 mt-1 sm:mt-1.5 font-sans">Support PDFs up to 25MB</span>
                  
                  <label className="mt-3 sm:mt-4 px-4 sm:px-5 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold rounded-[4px] border border-white/[0.06] cursor-pointer transition-colors">
                    Browse Files
                    <input 
                      type="file" 
                      accept="application/pdf" 
                      onChange={handleFileSelect} 
                      className="hidden" 
                    />
                  </label>
                </div>
              ) : (
                <div className="border border-white/[0.08] p-6 sm:p-8 md:p-12 rounded-[4px] bg-zinc-950/40 flex flex-col items-center justify-center text-center">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-indigo-950/50 border border-indigo-500/20 rounded-[4px] flex items-center justify-center mb-3 sm:mb-4 text-indigo-400 animate-pulse">
                    <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-white">Analyzing document structure...</span>
                  <span className="text-[10px] sm:text-xs text-zinc-550 mt-1 sm:mt-1.5 font-sans">Learnly AI is generating your summaries, quizzes and flashcards.</span>
                  
                  {/* Progress bar */}
                  <div className="w-56 bg-zinc-900 h-1.5 rounded-full overflow-hidden mt-5 border border-white/[0.05]">
                    <div 
                      className="bg-indigo-500 h-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400 mt-2">{uploadProgress}%</span>
                </div>
              )}

              {/* Error box */}
              {uploadError && (
                <div className="p-4 rounded-[4px] bg-rose-500/10 border border-rose-500/30 text-sm text-rose-300 font-medium">
                  {uploadError}
                </div>
              )}

              {/* Uploaded History List */}
              <div className="space-y-4">
                <span className="text-[11px] font-mono font-semibold tracking-widest text-zinc-500 uppercase">Recently Uploaded</span>
                <div className="border border-white/[0.06] rounded-[4px] bg-zinc-950/40 divide-y divide-white/[0.05]">
                  {uploads.length === 0 ? (
                    <div className="p-6 text-center text-xs text-zinc-500 italic">
                      No files uploaded yet. Upload a PDF above to get started.
                    </div>
                  ) : (
                    uploads.map(item => (
                      <div 
                        key={item.id}
                        onClick={() => {
                          setSelectedUploadId(item.id)
                          setSearchParams({ uploadId: item.id })
                        }}
                        className="py-3.5 px-4 flex items-center justify-between text-sm hover:bg-white/[0.02] cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3 overflow-hidden pr-2">
                          <FileText className="h-4.5 w-4.5 text-zinc-500 flex-shrink-0" />
                          <span className="text-zinc-200 font-medium truncate">{item.file_name}</span>
                        </div>
                        <div className="flex items-center gap-4 text-zinc-500 font-mono text-xs flex-shrink-0">
                          <span>{Math.round(item.file_size / 1024)} KB</span>
                          <span className="px-2 py-0.5 rounded-[2px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-450 uppercase text-[9px] font-bold">Ready</span>
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* 3. RIGHT PANEL (AI STUDY ASSISTANT) */}
      <aside className={`fixed lg:relative w-full sm:w-[380px] lg:w-[340px] xl:w-[400px] h-full flex flex-col bg-zinc-950 flex-shrink-0 z-40 select-none transition-transform duration-300 ${
        isRightPanelOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      }`}>
        
        {/* Assistant Header */}
        <div className="h-14 border-b border-white/[0.05] px-5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4.5 w-4.5 text-indigo-400" />
            <span className="text-sm font-semibold text-white">Study Assistant</span>
          </div>
          <button 
            onClick={() => setIsRightPanelOpen(false)}
            className="lg:hidden p-1 hover:bg-white/[0.05] rounded-[4px] transition-colors"
          >
            <X className="h-5 w-5 text-zinc-400" />
          </button>
        </div>

        {selectedUploadId && selectedUpload ? (
          /* ACTIVE STUDY MODE WITH SELECTION */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Assistant Tabs selector */}
            <div className="flex border-b border-white/[0.05] bg-zinc-900/10 p-1.5 gap-1">
              {['summary', 'flashcards', 'quiz', 'chat'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-1 rounded-[2px] text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold transition-all ${
                    activeTab === tab 
                      ? 'bg-white/[0.05] text-white border border-white/[0.05]' 
                      : 'text-zinc-550 hover:text-zinc-300'
                  }`}
                >
                  <span className="hidden sm:inline">{tab}</span>
                  <span className="sm:hidden">
                    {tab === 'summary' ? 'Sum' : tab === 'flashcards' ? 'Cards' : tab === 'quiz' ? 'Quiz' : 'Chat'}
                  </span>
                </button>
              ))}
            </div>

            {/* Tab contents */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              
              {/* TAB 1: SUMMARY */}
              {activeTab === 'summary' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
                    <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> 8 min read</span>
                    <span className="px-2 py-0.5 rounded-[2px] bg-zinc-900 border border-white/[0.05] text-[10px] uppercase font-bold tracking-wider text-indigo-400">Intermediate</span>
                  </div>
                  
                  {summary ? (
                    <>
                      <p className="text-sm text-zinc-300 leading-relaxed font-sans">{summary.overview}</p>
                      <div className="space-y-3.5 pt-2">
                        <span className="text-[11px] font-mono font-bold tracking-widest text-zinc-550 uppercase">Key Takeaways</span>
                        <ul className="space-y-3">
                          {summary.key_points?.map((pt, i) => (
                            <li key={i} className="flex gap-3 items-start text-[13px] text-zinc-400 leading-relaxed">
                              <span className="h-4.5 w-4.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="h-3 w-3 text-emerald-400" />
                              </span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-10 text-zinc-550 text-xs italic">Loading summary details...</div>
                  )}
                </div>
              )}

              {/* TAB 2: FLASHCARDS */}
              {activeTab === 'flashcards' && (
                <div className="space-y-6">
                  {flashcards.length === 0 ? (
                    <div className="text-center py-10 text-zinc-550 italic text-xs">No flashcards available.</div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center text-xs font-mono text-zinc-550">
                        <span>Card {flashcardIndex + 1} of {flashcards.length}</span>
                        <span className="uppercase text-[10px] text-indigo-400 px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded-[2px]">{flashcards[flashcardIndex].difficulty}</span>
                      </div>

                      {/* Interactive Flip Card */}
                      <div 
                        onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                        className="h-[180px] sm:h-[210px] bg-zinc-900/60 border border-white/[0.06] rounded-[4px] p-6 sm:p-8 flex flex-col justify-between cursor-pointer select-none hover:border-white/20 transition-all shadow-md group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
                        <span className="text-[9px] font-mono text-zinc-650 uppercase tracking-widest block font-bold">{flashcardFlipped ? 'Answer Key' : 'Question'}</span>
                        
                        <div className="flex-1 flex items-center justify-center text-center my-2 sm:my-3">
                          <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                            {flashcardFlipped ? flashcards[flashcardIndex].answer : flashcards[flashcardIndex].question}
                          </p>
                        </div>
                        
                        <span className="text-[9px] sm:text-[10px] text-zinc-500 text-center block mt-1 group-hover:text-zinc-350 transition-colors">Click to flip card</span>
                      </div>

                      {/* Flashcard navigation controls */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setFlashcardIndex(prev => Math.max(0, prev - 1))
                            setFlashcardFlipped(false)
                          }}
                          disabled={flashcardIndex === 0}
                          className="flex-1 py-2.5 bg-zinc-950 border border-white/[0.08] hover:bg-zinc-900 disabled:opacity-30 text-zinc-300 text-xs font-semibold rounded-[4px] transition-colors"
                        >
                          Prev
                        </button>
                        <button
                          onClick={() => {
                            setFlashcardIndex(prev => Math.min(flashcards.length - 1, prev + 1))
                            setFlashcardFlipped(false)
                          }}
                          disabled={flashcardIndex === flashcards.length - 1}
                          className="flex-1 py-2.5 bg-zinc-950 border border-white/[0.08] hover:bg-zinc-900 disabled:opacity-30 text-zinc-300 text-xs font-semibold rounded-[4px] transition-colors"
                        >
                          Next
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* TAB 3: QUIZ */}
              {activeTab === 'quiz' && (
                <div className="space-y-5">
                  {quizzes.length === 0 ? (
                    <div className="text-center py-10 text-zinc-550 italic text-xs">No quiz questions available.</div>
                  ) : quizFinished ? (
                    /* Score results view */
                    <div className="border border-white/[0.06] bg-zinc-950 p-6 sm:p-8 rounded-[4px] text-center space-y-3 sm:space-y-4 shadow-sm">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto">
                        <Activity className="h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />
                      </div>
                      <h3 className="font-display text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Quiz Finished</h3>
                      <p className="text-3xl sm:text-4xl font-mono font-bold text-indigo-400">{Math.round((quizScore / quizzes.length) * 100)}%</p>
                      <p className="text-[10px] sm:text-xs text-zinc-400">You answered {quizScore} out of {quizzes.length} questions correctly.</p>
                      
                      <button
                        onClick={() => {
                          setQuizIndex(0)
                          setQuizScore(0)
                          setQuizFinished(false)
                          setSelectedQuizAnswer(null)
                        }}
                        className="w-full py-2.5 bg-white hover:bg-zinc-200 text-black text-xs font-semibold rounded-[4px] transition-all"
                      >
                        Retake Quiz
                      </button>
                    </div>
                  ) : (
                    /* Question View */
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-xs font-mono text-zinc-550">
                        <span>Question {quizIndex + 1} of {quizzes.length}</span>
                        <span>Score: {quizScore}</span>
                      </div>

                      {/* Question Container */}
                      <div className="p-4 sm:p-5 bg-zinc-900/60 border border-white/[0.06] rounded-[4px]">
                        <p className="text-xs sm:text-sm text-white font-medium leading-snug">{quizzes[quizIndex].question}</p>
                      </div>

                      {/* Choices Options List */}
                      <div className="space-y-2 sm:space-y-2.5 text-xs">
                        {quizzes[quizIndex].options?.map((option, idx) => {
                          const isSelected = selectedQuizAnswer === option
                          const isCorrectOption = option === quizzes[quizIndex].correct_answer
                          let buttonStyle = 'bg-zinc-950 hover:bg-zinc-900 text-zinc-400 border-white/[0.05]'
                          
                          if (selectedQuizAnswer !== null) {
                            if (isCorrectOption) {
                              buttonStyle = 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            } else if (isSelected) {
                              buttonStyle = 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                            } else {
                              buttonStyle = 'bg-zinc-950/20 text-zinc-650 border-white/[0.02]'
                            }
                          }

                          return (
                            <button
                              key={idx}
                              onClick={() => handleQuizAnswer(option)}
                              disabled={selectedQuizAnswer !== null}
                              className={`w-full p-3 sm:p-3.5 text-left border rounded-[4px] transition-all flex items-center justify-between text-xs sm:text-sm ${buttonStyle}`}
                            >
                              <span>{option}</span>
                              {selectedQuizAnswer !== null && isCorrectOption && <Check className="h-4 w-4 text-emerald-400" />}
                            </button>
                          )
                        })}
                      </div>

                      {selectedQuizAnswer !== null && quizzes[quizIndex].explanation && (
                        <div className="p-3 sm:p-4 bg-zinc-950 border border-white/[0.06] rounded-[4px] text-[10px] sm:text-xs text-zinc-500 leading-normal">
                          <strong className="text-zinc-400 block mb-0.5">Explanation:</strong>
                          {quizzes[quizIndex].explanation}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: CHAT */}
              {activeTab === 'chat' && (
                <div className="flex flex-col h-[calc(100vh-200px)] sm:h-[calc(100vh-230px)]">
                  {/* Messages Feed */}
                  <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
                    {chatMessages.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-center p-6 text-xs text-zinc-550 italic">
                        Ask a question about the document text above.
                      </div>
                    ) : (
                      chatMessages.map((msg, i) => (
                        <div 
                          key={i}
                          className={`flex flex-col gap-1 max-w-[85%] ${msg.role === 'user' ? 'ml-auto items-end' : 'items-start'}`}
                        >
                          <span className="text-[9px] font-mono uppercase text-zinc-550 tracking-wider">
                            {msg.role === 'user' ? 'You' : 'AI Assistant'}
                          </span>
                          <div 
                            className={`p-3 sm:p-3.5 rounded-[4px] text-xs sm:text-sm leading-relaxed ${
                              msg.role === 'user'
                                ? 'bg-indigo-500/15 border border-indigo-500/35 text-indigo-100'
                                : 'bg-zinc-900 border border-white/[0.06] text-zinc-300'
                            }`}
                          >
                            {msg.role === 'user' ? msg.content : formatAssistantResponse(msg.content)}
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Input form */}
                  <div className="border border-white/[0.06] bg-zinc-900/60 p-2 rounded-[4px] flex items-center gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                      placeholder={isSendingChat ? "Thinking..." : "Ask study assistant..."}
                      disabled={isSendingChat}
                      className="flex-1 bg-transparent outline-none text-xs sm:text-sm text-white placeholder-zinc-650 px-2 sm:px-3 py-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button 
                      onClick={handleSendChat}
                      disabled={isSendingChat || !chatInput.trim()}
                      className="h-8 px-3 sm:px-4 bg-white hover:bg-zinc-200 text-black text-[10px] sm:text-xs font-semibold rounded-[2px] transition-colors disabled:bg-zinc-800/80 disabled:text-zinc-550 disabled:cursor-not-allowed flex items-center gap-1.5"
                    >
                      {isSendingChat ? (
                        <>
                          <span className="h-3 w-3 border-2 border-t-zinc-600 border-zinc-900 rounded-full animate-spin" />
                          <span className="hidden sm:inline">Wait...</span>
                        </>
                      ) : (
                        <span>Send</span>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        ) : (
          /* PLACEHOLDER MODE (NO DOCUMENT SELECTED) */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="h-12 w-12 bg-zinc-900 border border-white/[0.06] rounded-full flex items-center justify-center text-zinc-650">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-400">Assistant Dormant</h3>
              <p className="text-xs text-zinc-550 max-w-[220px] mx-auto mt-1 leading-normal font-sans">Please select or upload a document to initialize study assistant.</p>
            </div>
          </div>
        )}
      </aside>

      {/* Debug Monitor Panel */}
      <div className="fixed bottom-4 right-4 z-[9999]">
        <button 
          onClick={() => setShowDebug(!showDebug)} 
          className="px-3.5 py-2 bg-zinc-950/90 backdrop-blur-md border border-white/[0.08] hover:bg-zinc-900 hover:border-white/20 text-[10px] font-mono rounded-[4px] flex items-center gap-2 shadow-2xl text-zinc-400 hover:text-white transition-all cursor-pointer"
        >
          <span className={`h-1.5 w-1.5 rounded-full ${debugLogs.length > 0 ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
          Diagnostics & Logs ({debugLogs.length})
        </button>

        {showDebug && (
          <div className="absolute bottom-11 right-0 w-[420px] max-h-[350px] overflow-y-auto bg-zinc-950/95 backdrop-blur-md border border-white/[0.1] rounded-[6px] p-5 shadow-[0_25px_60px_rgba(0,0,0,0.85)] space-y-4 font-mono text-[11px] text-zinc-300">
            <div className="flex justify-between items-center border-b border-white/[0.08] pb-2.5">
              <span className="font-bold text-zinc-200 text-xs">System Diagnostics Monitor</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setDebugLogs([])} className="text-[10px] text-indigo-400 hover:text-indigo-300 transition-colors">Clear</button>
                <button onClick={() => setShowDebug(false)} className="text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors">Close</button>
              </div>
            </div>
            {debugLogs.length === 0 ? (
              <p className="text-zinc-650 italic text-[11px] py-6 text-center">No system errors or console warnings logged.</p>
            ) : (
              <div className="space-y-3 max-h-[240px] overflow-y-auto pr-1">
                {debugLogs.map((log, i) => (
                  <div key={i} className="p-3 bg-zinc-900/40 rounded border border-white/[0.04] space-y-1.5">
                    <div className="flex justify-between text-[9px] font-bold">
                      <span className={log.type.includes('Error') || log.type.includes('Rejection') ? 'text-rose-450' : 'text-amber-500'}>
                        [{log.type}]
                      </span>
                      <span className="text-zinc-600">{log.time}</span>
                    </div>
                    <p className="text-[11px] text-zinc-300 break-all leading-normal">{log.message}</p>
                    {log.stack && (
                      <pre className="text-[9px] text-zinc-550 overflow-x-auto max-h-[80px] bg-black/40 p-2 rounded leading-tight font-mono select-text">
                        {log.stack}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  )
}
