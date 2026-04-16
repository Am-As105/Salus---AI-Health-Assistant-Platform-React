export function AppointmentList({ appointments, onCancel, loading }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {appointments.map(a => (
        <li key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, padding: '8px 12px', border: '1px solid #e0e0e0', borderRadius: 6 }}>
          <span style={{ flex: 1, textDecoration: a.status === 'cancelled' ? 'line-through' : 'none', color: a.status === 'cancelled' ? '#999' : '#000' }}>
            {a.name}
          </span>
          <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 12, background: a.status === 'cancelled' ? '#fdecea' : '#e8f5e9', color: a.status === 'cancelled' ? '#c62828' : '#2e7d32' }}>
            {a.status === 'cancelled' ? 'Annulé' : 'Actif'}
          </span>
          {a.status === 'active' && (
            <button
              onClick={() => onCancel(a.id)}
              disabled={loading === a.id}
              style={{ padding: '4px 10px', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, cursor: loading === a.id ? 'not-allowed' : 'pointer', opacity: loading === a.id ? 0.6 : 1 }}
            >
              {loading === a.id ? '...' : 'Annuler'}
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}
