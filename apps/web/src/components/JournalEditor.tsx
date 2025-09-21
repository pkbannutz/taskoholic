import { useState, useEffect, useRef } from 'react'

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  tags: string[]
  isNew?: boolean
}

const defaultNotes: Note[] = [
  {
    id: '1',
    title: 'Project Ideas',
    content: `# Project Ideas

## Web Development
- Build a personal portfolio with React
- Create a task management app
- Develop a blog with Next.js

## Mobile Apps
- Fitness tracking app
- Recipe organizer
- Expense tracker

## Learning Goals
- Master TypeScript
- Learn GraphQL
- Study design patterns`,
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 3600000),
    tags: ['ideas', 'planning']
  },
  {
    id: '2',
    title: 'Daily Reflection',
    content: `# Daily Reflection - ${new Date().toLocaleDateString()}

## What went well today?
- Completed the morning workout
- Finished the React component
- Had a productive team meeting

## What could be improved?
- Need to focus better during deep work sessions
- Should take more breaks

## Tomorrow's priorities
1. Review the code changes
2. Plan the next sprint
3. Call mom`,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ['reflection', 'daily']
  }
]

export default function JournalEditor() {
  const [notes, setNotes] = useState<Note[]>(defaultNotes)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSidebar, setShowSidebar] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)
  
  const titleRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: '',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: [],
      isNew: true
    }
    setNotes([newNote, ...notes])
    setSelectedNote(newNote)
    setIsEditing(true)
    setCurrentNoteIndex(0)
    setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.focus()
      }
    }, 100)
  }

  const updateNote = (updatedNote: Note) => {
    setNotes(notes.map(note => 
      note.id === updatedNote.id 
        ? { ...updatedNote, updatedAt: new Date(), isNew: false }
        : note
    ))
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id))
    if (selectedNote?.id === id) {
      const currentIndex = filteredNotes.findIndex(note => note.id === id)
      const nextNote = filteredNotes[currentIndex + 1] || filteredNotes[currentIndex - 1] || null
      setSelectedNote(nextNote)
      setIsEditing(false)
    }
  }

  const navigateToNote = (index: number) => {
    if (index >= 0 && index < filteredNotes.length) {
      setCurrentNoteIndex(index)
      setSelectedNote(filteredNotes[index])
      setIsEditing(false)
    }
  }

  const handleSwipeStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleSwipeMove = (e: React.TouchEvent) => {
    if (!touchStartX.current || !touchStartY.current) return
    
    const touchEndX = e.touches[0].clientX
    const touchEndY = e.touches[0].clientY
    const deltaX = touchStartX.current - touchEndX
    const deltaY = touchStartY.current - touchEndY
    
    // Only trigger swipe if horizontal movement is greater than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        setSwipeDirection('left')
      } else {
        setSwipeDirection('right')
      }
    }
  }

  const handleSwipeEnd = () => {
    if (swipeDirection === 'left' && currentNoteIndex < filteredNotes.length - 1) {
      navigateToNote(currentNoteIndex + 1)
    } else if (swipeDirection === 'right' && currentNoteIndex > 0) {
      navigateToNote(currentNoteIndex - 1)
    }
    setSwipeDirection(null)
    touchStartX.current = 0
    touchStartY.current = 0
  }

  const createTaskFromText = (text: string) => {
    console.log('Creating task from text:', text)
    alert(`Creating task: "${text}"`)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getRelativeTime = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return formatDate(date)
  }

  // If we're in fullscreen editing mode, show the book-like page
  if (isFullscreen && selectedNote && isEditing) {
    return (
      <div className="fixed inset-0 book-background z-50 flex flex-col">
        {/* Book Header */}
        <div className="book-header">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFullscreen(false)}
                className="book-button"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="text-sm text-amber-600">
                {currentNoteIndex + 1} of {filteredNotes.length}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsEditing(false)
                  setIsFullscreen(false)
                }}
                className="book-button-primary"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>

        {/* Book Page Editor */}
        <div 
          className="book-page-editor"
          onTouchStart={handleSwipeStart}
          onTouchMove={handleSwipeMove}
          onTouchEnd={handleSwipeEnd}
        >
          <input
            ref={titleRef}
            type="text"
            value={selectedNote.title}
            onChange={(e) => updateNote({ ...selectedNote, title: e.target.value })}
            placeholder="Untitled"
            className="book-title-input"
          />
          <textarea
            ref={contentRef}
            value={selectedNote.content}
            onChange={(e) => updateNote({ ...selectedNote, content: e.target.value })}
            placeholder="Start writing your thoughts..."
            className="book-content-textarea"
            style={{ minHeight: 'calc(100vh - 200px)' }}
          />
        </div>

        {/* Page Indicators */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {filteredNotes.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentNoteIndex ? 'bg-amber-600' : 'bg-amber-300'
              }`}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen book-background">
      {/* Book Header */}
      <div className="book-header">
        <div className="max-w-4xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="book-button lg:hidden"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h2 className="text-2xl font-serif text-amber-900">My Journal</h2>
                <p className="text-sm text-amber-700 mt-1">Thoughts and memories</p>
              </div>
            </div>
            <button
              onClick={createNewNote}
              className="book-button-primary"
            >
              + New Page
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex">
        {/* Book Sidebar */}
        {showSidebar && (
          <div className="book-sidebar">
            {/* Search */}
            <div className="p-6 border-b border-amber-200">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your journal..."
                className="book-input"
              />
            </div>

            {/* Notes List */}
            <div className="flex-1 overflow-y-auto">
              {filteredNotes.map((note, index) => (
                <div
                  key={note.id}
                  onClick={() => {
                    setSelectedNote(note)
                    setIsEditing(false)
                    setCurrentNoteIndex(index)
                  }}
                  className={`book-note-item ${
                    selectedNote?.id === note.id ? 'book-note-active' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-amber-900 truncate mb-1">
                        {note.title || 'Untitled'}
                      </h3>
                      <p className="text-sm text-amber-700 line-clamp-2 mb-2">
                        {note.content.replace(/#/g, '').substring(0, 120)}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-amber-600">
                          {getRelativeTime(note.updatedAt)}
                        </span>
                        {note.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteNote(note.id)
                      }}
                      className="ml-2 p-1 text-amber-400 hover:text-red-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Book Pages */}
        <div className="flex-1">
          {selectedNote ? (
            <div className="book-page-container">
              {/* Book Page Header */}
              <div className="book-page-header">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-serif text-amber-900">
                      {selectedNote.title || 'Untitled'}
                    </h3>
                    <p className="text-sm text-amber-600 mt-1">
                      {getRelativeTime(selectedNote.updatedAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsEditing(true)
                        setIsFullscreen(true)
                      }}
                      className="book-button-secondary"
                    >
                      ✏️ Write
                    </button>
                  </div>
                </div>
              </div>

              {/* Book Page Content */}
              <div className="book-page-content">
                <div className="book-text-content">
                  <div className="book-prose">
                    <pre className="whitespace-pre-wrap font-serif text-amber-900 leading-relaxed">
                      {selectedNote.content || 'Start writing your thoughts...'}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="book-page-container">
              <div className="book-empty-state">
                <div className="text-8xl mb-6">📖</div>
                <h3 className="text-2xl font-serif text-amber-900 mb-3">
                  Your Journal Awaits
                </h3>
                <p className="text-amber-700 mb-8 max-w-md">
                  Begin your journey of thoughts, ideas, and memories. Create your first page to start writing.
                </p>
                <button
                  onClick={createNewNote}
                  className="book-button-primary text-lg px-8 py-4"
                >
                  Start Writing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
