import { useState } from 'react'

interface Habit {
  id: string
  name: string
  streak: number
  completedToday: boolean
  color: string
  icon: string
}

const defaultHabits: Habit[] = [
  {
    id: '1',
    name: 'Morning Exercise',
    streak: 7,
    completedToday: true,
    color: 'from-success-500 to-success-600',
    icon: '🏃‍♂️'
  },
  {
    id: '2',
    name: 'Read 30 minutes',
    streak: 12,
    completedToday: false,
    color: 'from-primary-500 to-primary-600',
    icon: '📚'
  },
  {
    id: '3',
    name: 'Meditation',
    streak: 5,
    completedToday: true,
    color: 'from-accent-500 to-accent-600',
    icon: '🧘‍♀️'
  },
  {
    id: '4',
    name: 'Drink Water',
    streak: 3,
    completedToday: false,
    color: 'from-blue-500 to-blue-600',
    icon: '💧'
  },
  {
    id: '5',
    name: 'Write Journal',
    streak: 8,
    completedToday: false,
    color: 'from-purple-500 to-purple-600',
    icon: '✍️'
  }
]

export default function HabitsTracker() {
  const [habits, setHabits] = useState<Habit[]>(defaultHabits)
  const [newHabit, setNewHabit] = useState('')

  const toggleHabit = (id: string) => {
    setHabits(habits.map(habit => 
      habit.id === id 
        ? { ...habit, completedToday: !habit.completedToday, streak: !habit.completedToday ? habit.streak + 1 : habit.streak }
        : habit
    ))
  }

  const addHabit = () => {
    if (newHabit.trim()) {
      const habit: Habit = {
        id: Date.now().toString(),
        name: newHabit.trim(),
        streak: 0,
        completedToday: false,
        color: 'from-slate-500 to-slate-600',
        icon: '⭐'
      }
      setHabits([...habits, habit])
      setNewHabit('')
    }
  }

  const completedToday = habits.filter(habit => habit.completedToday).length
  const totalHabits = habits.length
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-3">
          Build Consistency
        </h2>
        <p className="text-slate-600 text-lg">
          Small habits, big results.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="card-premium p-6">
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-gradient-success mb-2">
            {completedToday}/{totalHabits}
          </div>
          <div className="text-sm text-slate-600 mb-4">Habits completed today</div>
          <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-success-500 to-success-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
          <div className="text-xs text-slate-500">{completionRate}% complete</div>
        </div>
      </div>

      {/* Add New Habit */}
      <div className="card-premium p-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addHabit()}
            placeholder="Add a new habit..."
            className="input-premium flex-1"
          />
          <button
            onClick={addHabit}
            className="btn-primary px-6"
          >
            Add
          </button>
        </div>
      </div>

      {/* Habits List */}
      <div className="space-y-4">
        {habits.map((habit) => (
          <div key={habit.id} className="card-interactive p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${habit.color} rounded-xl flex items-center justify-center text-white text-xl shadow-medium`}>
                  {habit.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-lg">{habit.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-slate-600">🔥 {habit.streak} day streak</span>
                    {habit.streak >= 7 && (
                      <span className="text-xs bg-success-100 text-success-700 px-2 py-1 rounded-full font-medium">
                        On fire!
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => toggleHabit(habit.id)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 shadow-medium ${
                  habit.completedToday
                    ? 'bg-gradient-to-r from-success-500 to-success-600 text-white hover:scale-105'
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600'
                }`}
              >
                {habit.completedToday ? '✓' : '○'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Motivational Message */}
      {completedToday === totalHabits && totalHabits > 0 && (
        <div className="card-premium p-6 text-center bg-gradient-to-r from-success-50 to-success-100 border-success-200">
          <div className="text-4xl mb-3">🎉</div>
          <h3 className="text-xl font-bold text-success-800 mb-2">
            Perfect Day!
          </h3>
          <p className="text-success-700">
            You've completed all your habits today. Keep the momentum going!
          </p>
        </div>
      )}

      {/* Streak Leaderboard */}
      <div className="card-premium p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Streak Leaders</h3>
        <div className="space-y-3">
          {habits
            .sort((a, b) => b.streak - a.streak)
            .slice(0, 3)
            .map((habit, index) => (
              <div key={habit.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                    index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                    'bg-gradient-to-r from-orange-500 to-orange-600'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-slate-700 font-medium">{habit.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔥</span>
                  <span className="font-bold text-slate-800">{habit.streak}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
