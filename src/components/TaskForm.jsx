import { useState } from 'react'

export default function TaskForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('low')

  const submit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit({ title, description: description || undefined, priority })
    setTitle('')
    setDescription('')
    setPriority('low')
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-4 sm:p-6 shadow-sm">
      <div className="grid sm:grid-cols-3 gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="sm:col-span-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
        <select value={priority} onChange={(e)=>setPriority(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Details (optional)"
        className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
        rows={3}
      />
      <div className="mt-4 flex items-center gap-3 justify-end">
        <button type="button" onClick={onCancel} className="rounded-xl px-4 py-2 text-slate-600 hover:bg-slate-100">Cancel</button>
        <button type="submit" className="rounded-xl bg-sky-300 hover:bg-sky-400 text-slate-800 font-medium px-4 py-2 shadow-sm">Add Task</button>
      </div>
    </form>
  )
}
