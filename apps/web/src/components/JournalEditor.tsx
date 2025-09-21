import { useState } from 'react'

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  tags: string[]
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

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '# New Note\n\nStart writing...',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: []
    }
    setNotes([newNote, ...notes])
    setSelectedNote(newNote)
    setIsEditing(true)
  }

  const updateNote = (updatedNote: Note) => {
    setNotes(notes.map(note => 
      note.id === updatedNote.id 
        ? { ...updatedNote, updatedAt: new Date() }
        : note
    ))
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id))
    if (selectedNote?.id === id) {
      setSelectedNote(null)
      setIsEditing(false)
    }
  }

  const createTaskFromText = (text: string) => {
    // This would integrate with the main app's task creation
    console.log('Creating task from text:', text)
    // For now, just show an alert
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-3">
          Your Digital Journal
        </h2>
        <p className="text-slate-600 text-lg">
          Capture thoughts, convert to action.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notes Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search and New Note */}
          <div className="card-premium p-4">
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes..."
                className="input-premium flex-1 text-sm"
              />
            </div>
            <button
              onClick={createNewNote}
              className="btn-primary w-full"
            >
              + New Note
            </button>
          </div>

          {/* Notes List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className={`card-interactive p-4 cursor-pointer ${
                  selectedNote?.id === note.id ? 'ring-2 ring-primary-500 bg-primary-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 mb-1">{note.title}</h3>
                    <p className="text-sm text-slate-600 mb-2 line-clamp-2">
                      {note.content.replace(/#/g, '').substring(0, 100)}...
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">
                        {formatDate(note.updatedAt)}
                      </span>
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteNote(note.id)
                    }}
                    className="text-slate-400 hover:text-red-500 transition-colors ml-2"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="lg:col-span-2">
          {selectedNote ? (
            <div className="card-premium p-6 h-full">
              {!isEditing ? (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-slate-800">{selectedNote.title}</h3>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn-secondary"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="prose prose-slate max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed">
                      {selectedNote.content}
                    </pre>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <input
                      type="text"
                      value={selectedNote.title}
                      onChange={(e) => updateNote({ ...selectedNote, title: e.target.value })}
                      className="text-2xl font-bold text-slate-800 bg-transparent border-none outline-none w-full"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="btn-success"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={selectedNote.content}
                    onChange={(e) => updateNote({ ...selectedNote, content: e.target.value })}
                    placeholder="Start writing..."
                    className="w-full h-96 p-4 border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-700 leading-relaxed"
                  />
                  
                  {/* Task Creation Helper */}
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl">
                    <h4 className="font-semibold text-slate-700 mb-2">Quick Actions</h4>
                    <p className="text-sm text-slate-600 mb-3">
                      Select text in your note to create tasks instantly
                    </p>
                    <button
                      onClick={() => {
                        const selectedText = window.getSelection()?.toString()
                        if (selectedText) {
                          createTaskFromText(selectedText)
                        } else {
                          alert('Please select some text first')
                        }
                      }}
                      className="btn-primary text-sm"
                    >
                      + Create Task from Selection
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="card-premium p-12 text-center h-full flex flex-col justify-center">
              <div className="text-6xl mb-4 animate-float">📝</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Select a note to view
              </h3>
              <p className="text-slate-600 mb-6">
                Choose from your notes or create a new one to get started.
              </p>
              <button
                onClick={createNewNote}
                className="btn-primary"
              >
                Create New Note
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-premium p-6 text-center">
          <div className="text-2xl font-bold text-primary-600 mb-1">{notes.length}</div>
          <div className="text-sm text-slate-600">Total Notes</div>
        </div>
        <div className="card-premium p-6 text-center">
          <div className="text-2xl font-bold text-success-600 mb-1">
            {notes.filter(note => note.updatedAt.toDateString() === new Date().toDateString()).length}
          </div>
          <div className="text-sm text-slate-600">Updated Today</div>
        </div>
        <div className="card-premium p-6 text-center">
          <div className="text-2xl font-bold text-accent-600 mb-1">
            {Array.from(new Set(notes.flatMap(note => note.tags))).length}
          </div>
          <div className="text-sm text-slate-600">Unique Tags</div>
        </div>
      </div>
    </div>
  )
}
