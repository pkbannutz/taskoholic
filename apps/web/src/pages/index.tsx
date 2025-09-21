import { useState, useEffect } from 'react'
import Head from 'next/head'
import HabitsTracker from '../components/HabitsTracker'
import JournalEditor from '../components/JournalEditor'
import WeeklyPlanner from '../components/WeeklyPlanner'

interface Task {
  id: string
  text: string
  completed: boolean
  createdAt: Date
  completedAt?: Date
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')
  const [currentView, setCurrentView] = useState<'today' | 'weekly' | 'habits' | 'journal'>('today')
  const [isFocusMode, setIsFocusMode] = useState(false)
  const [focusTask, setFocusTask] = useState<Task | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [completedToday, setCompletedToday] = useState(0)

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date()
      }
      setTasks([task, ...tasks])
      setNewTask('')
    }
  }

  const completeTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: true, completedAt: new Date() }
        : task
    ))
    setCompletedToday(completedToday + 1)
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const startFocusSession = (task: Task, duration: number) => {
    setFocusTask(task)
    setTimeLeft(duration * 60)
    setIsRunning(true)
    setIsFocusMode(true)
  }

  const exitFocusMode = () => {
    setIsFocusMode(false)
    setFocusTask(null)
    setTimeLeft(0)
    setIsRunning(false)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && isRunning) {
      // Timer completed
      setIsRunning(false)
      // Could add notification here
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const views = [
    { id: 'today', name: 'Today', icon: '📅', color: 'from-primary-500 to-primary-600' },
    { id: 'weekly', name: 'Weekly', icon: '📊', color: 'from-success-500 to-success-600' },
    { id: 'habits', name: 'Habits', icon: '🔥', color: 'from-accent-500 to-accent-600' },
    { id: 'journal', name: 'Journal', icon: '📝', color: 'from-slate-500 to-slate-600' },
  ]

  const activeTasks = tasks.filter(task => !task.completed)
  const completedTasks = tasks.filter(task => task.completed)

  if (isFocusMode && focusTask) {
    return (
      <>
        <Head>
          <title>Focus Mode - Taskoholic</title>
        </Head>
        <div className="focus-mode">
          <div className="text-center">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">{focusTask.text}</h2>
              <div className="text-6xl font-mono font-bold text-white mb-4">
                {formatTime(timeLeft)}
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                >
                  {isRunning ? '⏸️ Pause' : '▶️ Resume'}
                </button>
                <button
                  onClick={exitFocusMode}
                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Taskoholic - Your Digital Productivity Journal</title>
        <meta name="description" content="The Digital Productivity Journal - Your single source for focused action and mindful clarity" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Premium Header */}
        <header className="nav-premium sticky top-0 z-40">
          <div className="max-w-lg mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <h1 className="text-xl font-bold text-gradient">Taskoholic</h1>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-slate-700">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="text-xs text-slate-500">
                  {completedToday} completed today
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        {currentView === 'today' && (
          <div className="px-6 py-8">
            <div className="max-w-lg mx-auto text-center mb-8">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">
                What needs your attention?
              </h2>
              <p className="text-slate-600 text-xl font-light">
                Capture it, focus on it, complete it.
              </p>
            </div>

            {/* Premium Task Input */}
            <div className="max-w-lg mx-auto mb-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-large border border-white/20 p-6">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                    placeholder="Enter a task or idea..."
                    className="flex-1 px-4 py-4 rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ease-out text-lg"
                  />
                  <button
                    onClick={addTask}
                    className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl shadow-medium hover:shadow-large hover:scale-105 transform transition-all duration-200 ease-out font-semibold"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="max-w-lg mx-auto px-6 pb-32">
          <div className={`transition-all duration-500 ease-in-out ${
            currentView === 'today' ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-4'
          }`}>
          {currentView === 'today' && (
            <div className="space-y-4">
              {/* Active Tasks */}
              {activeTasks.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                    Active Tasks
                  </h3>
                  <div className="space-y-4">
                    {activeTasks.map((task) => (
                      <div key={task.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-large border border-white/20 p-6 hover:shadow-glow hover:scale-[1.02] transition-all duration-300 ease-out">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="text-slate-800 font-semibold text-xl mb-4 leading-relaxed">{task.text}</h4>
                            <div className="flex gap-3 flex-wrap">
                              <button
                                onClick={() => startFocusSession(task, 5)}
                                className="px-6 py-3 bg-gradient-to-r from-success-500 to-success-600 text-white rounded-xl shadow-medium hover:shadow-glow-success hover:scale-105 transform transition-all duration-200 ease-out font-semibold text-sm"
                              >
                                ▶️ 5m
                              </button>
                              <button
                                onClick={() => startFocusSession(task, 15)}
                                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl shadow-medium hover:shadow-glow hover:scale-105 transform transition-all duration-200 ease-out font-semibold text-sm"
                              >
                                ▶️ 15m
                              </button>
                              <button
                                onClick={() => startFocusSession(task, 25)}
                                className="px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-xl shadow-medium hover:shadow-large hover:scale-105 transform transition-all duration-200 ease-out font-semibold text-sm"
                              >
                                ▶️ 25m
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3">
                            <button
                              onClick={() => completeTask(task.id)}
                              className="w-12 h-12 bg-gradient-to-r from-success-500 to-success-600 text-white rounded-xl flex items-center justify-center hover:scale-110 transform transition-all duration-200 shadow-medium hover:shadow-glow-success"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="w-12 h-12 bg-slate-100 text-slate-500 rounded-xl flex items-center justify-center hover:bg-slate-200 hover:text-red-500 transition-all duration-200"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Completed Tasks */}
              {completedTasks.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-success-500 rounded-full"></span>
                    Completed Today
                  </h3>
                  <div className="space-y-2">
                    {completedTasks.slice(0, 5).map((task) => (
                      <div key={task.id} className="card-premium p-4 opacity-75">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-gradient-to-r from-success-500 to-success-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                          <span className="text-slate-600 line-through">{task.text}</span>
                        </div>
                      </div>
                    ))}
                    {completedTasks.length > 5 && (
                      <div className="text-center text-slate-500 text-sm py-2">
                        +{completedTasks.length - 5} more completed
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {tasks.length === 0 && (
                <div className="card-premium p-12 text-center">
                  <div className="text-6xl mb-4 animate-float">🎯</div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    Ready to focus?
                  </h3>
                  <p className="text-slate-600">
                    Add your first task above to start building momentum.
                  </p>
                </div>
              )}
            </div>
          )}

          </div>

          {/* Weekly View */}
          <div className={`transition-all duration-500 ease-in-out ${
            currentView === 'weekly' ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-4'
          }`}>
            {currentView === 'weekly' && <WeeklyPlanner />}
          </div>

          {/* Habits View */}
          <div className={`transition-all duration-500 ease-in-out ${
            currentView === 'habits' ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-4'
          }`}>
            {currentView === 'habits' && <HabitsTracker />}
          </div>

          {/* Journal View */}
          <div className={`transition-all duration-500 ease-in-out ${
            currentView === 'journal' ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-4'
          }`}>
            {currentView === 'journal' && <JournalEditor />}
          </div>
        </main>

        {/* Premium Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/50 z-50">
          <div className="max-w-lg mx-auto px-6">
            <div className="flex justify-around py-4">
              {views.map((view) => (
                <button
                  key={view.id}
                  onClick={() => setCurrentView(view.id as any)}
                  className={`flex flex-col items-center py-3 px-4 rounded-xl transition-all duration-200 ease-out ${
                    currentView === view.id
                      ? 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 shadow-soft scale-105'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-2xl mb-1">{view.icon}</span>
                  <span className="text-xs font-semibold">{view.name}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
