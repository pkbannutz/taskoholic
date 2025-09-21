import { useState } from 'react'

interface WeeklyTask {
  id: string
  text: string
  day: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  estimatedTime: number
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const defaultTasks: WeeklyTask[] = [
  {
    id: '1',
    text: 'Review project requirements',
    day: 'Monday',
    completed: true,
    priority: 'high',
    estimatedTime: 60
  },
  {
    id: '2',
    text: 'Team standup meeting',
    day: 'Monday',
    completed: false,
    priority: 'medium',
    estimatedTime: 30
  },
  {
    id: '3',
    text: 'Design mockups',
    day: 'Tuesday',
    completed: false,
    priority: 'high',
    estimatedTime: 120
  },
  {
    id: '4',
    text: 'Code review',
    day: 'Wednesday',
    completed: false,
    priority: 'medium',
    estimatedTime: 90
  },
  {
    id: '5',
    text: 'Client presentation',
    day: 'Friday',
    completed: false,
    priority: 'high',
    estimatedTime: 45
  }
]

export default function WeeklyPlanner() {
  const [tasks, setTasks] = useState<WeeklyTask[]>(defaultTasks)
  const [draggedTask, setDraggedTask] = useState<WeeklyTask | null>(null)
  const [newTask, setNewTask] = useState('')
  const [selectedDay, setSelectedDay] = useState('')

  const getToday = () => {
    const today = new Date().getDay()
    return daysOfWeek[today === 0 ? 6 : today - 1]
  }

  const getTasksForDay = (day: string) => {
    return tasks.filter(task => task.day === day)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-500 to-red-600'
      case 'medium': return 'from-yellow-500 to-yellow-600'
      case 'low': return 'from-green-500 to-green-600'
      default: return 'from-slate-500 to-slate-600'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴'
      case 'medium': return '🟡'
      case 'low': return '🟢'
      default: return '⚪'
    }
  }

  const addTask = () => {
    if (newTask.trim() && selectedDay) {
      const task: WeeklyTask = {
        id: Date.now().toString(),
        text: newTask.trim(),
        day: selectedDay,
        completed: false,
        priority: 'medium',
        estimatedTime: 30
      }
      setTasks([...tasks, task])
      setNewTask('')
      setSelectedDay('')
    }
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleDragStart = (task: WeeklyTask) => {
    setDraggedTask(task)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, day: string) => {
    e.preventDefault()
    if (draggedTask) {
      setTasks(tasks.map(task =>
        task.id === draggedTask.id ? { ...task, day } : task
      ))
      setDraggedTask(null)
    }
  }

  const getWeeklyStats = () => {
    const totalTasks = tasks.length
    const completedTasks = tasks.filter(task => task.completed).length
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    const totalTime = tasks.reduce((sum, task) => sum + task.estimatedTime, 0)
    const completedTime = tasks
      .filter(task => task.completed)
      .reduce((sum, task) => sum + task.estimatedTime, 0)

    return { totalTasks, completedTasks, completionRate, totalTime, completedTime }
  }

  const stats = getWeeklyStats()
  const today = getToday()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-3">
          Weekly Planner
        </h2>
        <p className="text-slate-600 text-lg">
          Plan your week, execute with focus.
        </p>
      </div>

      {/* Weekly Overview */}
      <div className="card-premium p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary-600 mb-1">{stats.completedTasks}/{stats.totalTasks}</div>
            <div className="text-sm text-slate-600">Tasks Done</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-success-600 mb-1">{stats.completionRate}%</div>
            <div className="text-sm text-slate-600">Completion</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent-600 mb-1">{Math.round(stats.completedTime / 60)}h</div>
            <div className="text-sm text-slate-600">Time Spent</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-600 mb-1">{Math.round((stats.totalTime - stats.completedTime) / 60)}h</div>
            <div className="text-sm text-slate-600">Remaining</div>
          </div>
        </div>
      </div>

      {/* Add New Task */}
      <div className="card-premium p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Add New Task</h3>
        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task..."
            className="input-premium flex-1 min-w-64"
          />
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="input-premium w-32"
          >
            <option value="">Select day</option>
            {daysOfWeek.map(day => (
              <option key={day} value={day}>{day.slice(0, 3)}</option>
            ))}
          </select>
          <button
            onClick={addTask}
            className="btn-primary"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Weekly Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {daysOfWeek.map((day) => {
          const dayTasks = getTasksForDay(day)
          const isToday = day === today
          
          return (
            <div
              key={day}
              className={`card-premium p-4 min-h-96 ${
                isToday ? 'ring-2 ring-primary-500 bg-primary-50' : ''
              }`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, day)}
            >
              <div className="text-center mb-4">
                <h3 className={`font-semibold text-lg ${isToday ? 'text-primary-700' : 'text-slate-800'}`}>
                  {day.slice(0, 3)}
                </h3>
                {isToday && (
                  <span className="text-xs bg-primary-200 text-primary-800 px-2 py-1 rounded-full font-medium">
                    Today
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {dayTasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task)}
                    className={`p-3 rounded-lg border cursor-move transition-all duration-200 hover:scale-105 ${
                      task.completed
                        ? 'bg-success-50 border-success-200 opacity-75'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm">{getPriorityIcon(task.priority)}</span>
                          <span className="text-xs text-slate-500">{task.estimatedTime}m</span>
                        </div>
                        <p className={`text-sm font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                          {task.text}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                            task.completed
                              ? 'bg-success-500 border-success-500 text-white'
                              : 'border-slate-300 hover:border-slate-400'
                          }`}
                        >
                          {task.completed && '✓'}
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="w-6 h-6 text-slate-400 hover:text-red-500 transition-colors text-xs"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {dayTasks.length === 0 && (
                  <div className="text-center py-8 text-slate-400">
                    <div className="text-2xl mb-2">📅</div>
                    <div className="text-sm">No tasks</div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Weekly Goals */}
      <div className="card-premium p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Weekly Goals</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-700">Complete 80% of planned tasks</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-success-500 to-success-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(stats.completionRate, 80)}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-slate-600">
                {Math.min(stats.completionRate, 80)}%
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-slate-700">Spend 20+ hours on focused work</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((stats.completedTime / 60) / 20 * 100, 100)}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-slate-600">
                {Math.round(stats.completedTime / 60)}h
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
