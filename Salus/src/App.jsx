import { useState } from 'react'

function App() {
  const [items, setItems] = useState([
    { id: 1, name: 'Consultation Dr. Martin', done: false },
    { id: 2, name: 'Prise de médicaments', done: false },
    { id: 3, name: 'Rendez-vous analyse sanguine', done: false },
  ])
  const [newItem, setNewItem] = useState('')

  const addItem = () => {
    if (!newItem.trim()) return
    setItems(prev => [...prev, { id: Date.now(), name: newItem.trim(), done: false }])
    setNewItem('')
  }

  const toggleItem = (id) => {
    setItems(prev =>
      prev.map(item => item.id === id ? { ...item, done: !item.done } : item)
    )
  }

  const deleteItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Salus — Liste de santé</h2>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addItem()}
          placeholder="Nouvelle tâche..."
          style={{ flex: 1, padding: '6px 10px' }}
        />
        <button onClick={addItem}>Ajouter</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(item => (
          <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => toggleItem(item.id)}
            />
            <span style={{ flex: 1, textDecoration: item.done ? 'line-through' : 'none', color: item.done ? '#999' : '#000' }}>
              {item.name}
            </span>
            <button onClick={() => deleteItem(item.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>
              ✕
            </button>
          </li>
        ))}
      </ul>

      <p style={{ color: '#666', fontSize: 13 }}>
        {items.filter(i => i.done).length} / {items.length} tâches complétées
      </p>
    </div>
  )
}

export default App
