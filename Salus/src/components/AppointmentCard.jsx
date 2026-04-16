const STATUS_STYLE = {
  active: { background: '#e8f5e9', color: '#2e7d32', label: '✅ Actif' },
  cancelled: { background: '#fdecea', color: '#c62828', label: '❌ Annulé' },
}

export function AppointmentCard({ appointment: a, onCancel, loading }) {
  const s = STATUS_STYLE[a.status] || STATUS_STYLE.active
  return (
    <li style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '14px 16px', border: '1px solid #e0e0e0', borderRadius: 8, marginBottom: 12, background: a.status === 'cancelled' ? '#fafafa' : '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontWeight: 600, fontSize: 15, textDecoration: a.status === 'cancelled' ? 'line-through' : 'none', color: a.status === 'cancelled' ? '#999' : '#111' }}>
          {a.name}
        </span>
        <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 12, background: s.background, color: s.color, whiteSpace: 'nowrap' }}>
          {s.label}
        </span>
      </div>
      <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#555', flexWrap: 'wrap' }}>
        {a.doctor && <span>👨‍⚕️ {a.doctor}</span>}
        {a.specialty && <span>🏥 {a.specialty}</span>}
        {a.date && <span>📅 {a.date}</span>}
        {a.time && <span>🕐 {a.time}</span>}
        {a.type && <span>{a.type === 'teleconsultation' ? '💻' : '🏥'} {a.type}</span>}
      </div>
      {a.notes && <p style={{ margin: 0, fontSize: 13, color: '#777', fontStyle: 'italic' }}>📝 {a.notes}</p>}
      {a.status === 'active' && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => onCancel(a.id)}
            disabled={loading === a.id}
            style={{ padding: '5px 14px', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, cursor: loading === a.id ? 'not-allowed' : 'pointer', opacity: loading === a.id ? 0.6 : 1, fontSize: 13 }}
          >
            {loading === a.id ? 'Annulation...' : 'Annuler le RDV'}
          </button>
        </div>
      )}
    </li>
  )
}
