import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function App() {
  const [tasks, setTasks] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  const filtered = useMemo(() => {
    let data = tasks
    if (query) {
      data = data.filter((t) => t.title.toLowerCase().includes(query.toLowerCase()))
    }
    if (filter !== 'all') {
      data = data.filter((t) => (filter === 'done' ? t.completed : !t.completed))
    }
    return data
  }, [tasks, query, filter])

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/tasks`)
      const json = await res.json()
      setTasks(json)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTasks() }, [])

  const addTask = async (payload) => {
    try {
      const res = await fetch(`${API_BASE}/api/tasks`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const { id } = await res.json()
      setShowForm(false)
      await fetchTasks()
    } catch (e) { console.error(e) }
  }

  const toggleTask = async (task) => {
    try {
      await fetch(`${API_BASE}/api/tasks/${task.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ completed: !task.completed }) })
      await fetchTasks()
    } catch (e) { console.error(e) }
  }

  const deleteTask = async (task) => {
    try {
      await fetch(`${API_BASE}/api/tasks/${task.id}`, { method: 'DELETE' })
      setTasks((prev) => prev.filter((t) => t.id !== task.id))
    } catch (e) { console.error(e) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 to-violet-50">
      <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:'radial-gradient(1000px 200px at 20% 0%, rgba(56,189,248,0.15), transparent), radial-gradient(800px 200px at 80% 0%, rgba(244,114,182,0.15), transparent)'}}/>

      <main className="relative mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-10">
        <Header onAdd={() => setShowForm(true)} />

        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search tasks" className="w-full rounded-xl border border-slate-300 bg-white/70 backdrop-blur px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"/>
          </div>
          <div className="flex items-center gap-2">
            <select value={filter} onChange={(e)=>setFilter(e.target.value)} className="rounded-xl border border-slate-300 bg-white/70 backdrop-blur px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300">
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        {showForm && (
          <div className="mt-4">
            <TaskForm onSubmit={addTask} onCancel={()=>setShowForm(false)} />
          </div>
        )}

        <section className="mt-6">
          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white/60 p-8 text-center text-slate-500">Loading tasks…</div>
          ) : (
            <TaskList tasks={filtered} onToggle={toggleTask} onDelete={deleteTask} />
          )}
        </section>

        <footer className="mt-10 text-center text-slate-400 text-sm">Calm, pastel interface designed for focus</footer>
      </main>
    </div>
  )
}
