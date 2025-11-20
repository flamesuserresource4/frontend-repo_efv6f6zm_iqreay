import { Plus } from 'lucide-react'

export default function Header({ onAdd }) {
  return (
    <header className="flex items-center justify-between py-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800">Pastel To‑Do</h1>
        <p className="text-slate-500 text-sm">Organize your day with a calm, professional touch</p>
      </div>
      <button onClick={onAdd} className="inline-flex items-center gap-2 rounded-xl bg-pink-200 hover:bg-pink-300 text-slate-800 px-4 py-2 transition shadow-sm">
        <Plus size={18} />
        <span className="font-medium">New Task</span>
      </button>
    </header>
  )
}
