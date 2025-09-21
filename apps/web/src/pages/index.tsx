import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([])
  const [newTask, setNewTask] = useState('')
  const [currentView, setCurrentView] = useState<'today' | 'weekly' | 'habits' | 'journal'>('today')

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()])
      setNewTask('')
    }
  }

  const completeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  const startTimer = (duration: number) => {
    alert(`Starting ${duration} minute timer! 🚀`)
  }

  const views = [
    { id: 'today', name: 'Today', icon: '📅' },
    { id: 'weekly', name: 'Weekly', icon: '📊' },
    { id: 'habits', name: 'Habits', icon: '🔥' },
    { id: 'journal', name: 'Journal', icon: '📝' },
  ]

  return (
    <>
      <Head>
        <title>Taskoholic - Your Digital Productivity Journal</title>
        <meta name="description" content="The Digital Productivity Journal - Your single source for focused action and mindful clarity" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-journal-50 to-white journal-paper">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-journal-200 sticky top-0 z-40">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-journal-800">Taskoholic</h1>
              <div className="text-sm text-journal-600">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-md mx-auto px-4 py-6 pb-24">
          {/* Task Input */}
          <div className="mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-journal-200 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                  placeholder="What needs your attention today?"
                  className="flex-1 text-journal-800 placeholder-journal-400 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg px-3 py-2 border border-journal-200"
                />
                <button
                  onClick={addTask}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Today's Tasks */}
          {currentView === 'today' && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-journal-800 mb-4">Today's Focus</h2>
              
              {tasks.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-journal-200 p-8 text-center">
                  <div className="text-4xl mb-3">🎯</div>
                  <p className="text-journal-600">No tasks yet. Add one above to get started!</p>
                </div>
              ) : (
                tasks.map((task, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-journal-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-journal-800 font-medium">{task}</h3>
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => startTimer(5)}
                            className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                          >
                            ▶️ 5m
                          </button>
                          <button
                            onClick={() => startTimer(15)}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                          >
                            ▶️ 15m
                          </button>
                          <button
                            onClick={() => startTimer(25)}
                            className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                          >
                            ▶️ 25m
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => completeTask(index)}
                        className="text-journal-400 hover:text-green-600 transition-colors p-1"
                      >
                        ✅
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Other Views Placeholder */}
          {currentView !== 'today' && (
            <div className="bg-white rounded-xl shadow-sm border border-journal-200 p-8 text-center">
              <div className="text-4xl mb-3">
                {views.find(v => v.id === currentView)?.icon}
              </div>
              <h2 className="text-lg font-semibold text-journal-800 mb-2">
                {views.find(v => v.id === currentView)?.name} View
              </h2>
              <p className="text-journal-600">Coming soon! Focus on your tasks for now.</p>
            </div>
          )}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-journal-200 z-50">
          <div className="max-w-md mx-auto px-4">
            <div className="flex justify-around py-2">
              {views.map((view) => (
                <button
                  key={view.id}
                  onClick={() => setCurrentView(view.id as any)}
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                    currentView === view.id
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-journal-500 hover:text-journal-700'
                  }`}
                >
                  <span className="text-lg mb-1">{view.icon}</span>
                  <span className="text-xs font-medium">{view.name}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
