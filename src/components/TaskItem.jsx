import { CheckCircle2, Circle, Trash2 } from 'lucide-react'

export default function TaskItem({ task, onToggle, onDelete }) {
  const done = task.completed
  const priorityColor = {
    high: 'bg-red-200 text-red-700',
    medium: 'bg-amber-200 text-amber-700',
    low: 'bg-emerald-200 text-emerald-700',
  }[task.priority || 'low']

  return (
    <div className={`group rounded-xl border border-slate-200 bg-white/70 backdrop-blur p-4 shadow-sm flex items-start gap-3`}> 
      <button onClick={onToggle} className={`mt-0.5 rounded-full transition`}> 
        {done ? <CheckCircle2 className="text-emerald-500" /> : <Circle className="text-slate-400" />} 
      </button>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className={`font-medium text-slate-800 ${done ? 'line-through text-slate-400' : ''}`}>{task.title}</h3>
          {task.priority && <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColor}`}>{task.priority}</span>}
        </div>
        {task.description && (
          <p className={`text-slate-500 text-sm mt-1 ${done ? 'line-through' : ''}`}>{task.description}</p>
        )}
      </div>
      <button onClick={onDelete} className="opacity-0 group-hover:opacity-100 transition text-slate-400 hover:text-red-500">
        <Trash2 size={18} />
      </button>
    </div>
  )
}
