import { useState } from 'react'

const EMPTY = { name: '', doctor: '', date: '' }

export function AppointmentForm({ onCreate, creating }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Motif requis'
    if (!form.doctor.trim()) e.doctor = 'Médecin requis'
    if (!form.date) e.date = 'Date requise'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    await onCreate(form)
    setForm(EMPTY)
    setErrors({})
  }

  const field = (key, placeholder, type = 'text') => (
    <div style={{ marginBottom: 10 }}>
      <input
        type={type}
        value={form[key]}
        onChange={ev => setForm(prev => ({ ...prev, [key]: ev.target.value }))}
        placeholder={placeholder}
        style={{ width: '100%', padding: '6px 10px', boxSizing: 'border-box', borderColor: errors[key] ? '#c62828' : '#ccc', borderWidth: 1, borderStyle: 'solid', borderRadius: 4 }}
      />
      {errors[key] && <span style={{ color: '#c62828', fontSize: 12 }}>{errors[key]}</span>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} style={{ background: '#f5f5f5', padding: 16, borderRadius: 8, marginBottom: 20 }}>
      <h3 style={{ margin: '0 0 12px' }}>Nouveau rendez-vous</h3>
      {field('name', 'Motif de consultation')}
      {field('doctor', 'Médecin')}
      {field('date', 'Date', 'date')}
      <button
        type="submit"
        disabled={creating}
        style={{ padding: '7px 18px', background: '#1565c0', color: '#fff', border: 'none', borderRadius: 4, cursor: creating ? 'not-allowed' : 'pointer', opacity: creating ? 0.6 : 1 }}
      >
        {creating ? 'Création...' : '+ Créer'}
      </button>
    </form>
  )
}
