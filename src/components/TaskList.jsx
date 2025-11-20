import TaskItem from './TaskItem'

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white/60 p-8 text-center text-slate-500">
        No tasks yet. Add your first one to get started.
      </div>
    )
  }
  return (
    <div className="space-y-3">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onToggle={() => onToggle(t)} onDelete={() => onDelete(t)} />
      ))}
    </div>
  )
}
