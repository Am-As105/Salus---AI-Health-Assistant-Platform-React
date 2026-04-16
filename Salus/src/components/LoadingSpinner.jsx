export function LoadingSpinner() {
  return (
    <div style={{ textAlign: 'center', padding: '30px 0', color: '#1565c0' }}>
      <div style={{
        width: 36, height: 36, border: '4px solid #e3f2fd',
        borderTop: '4px solid #1565c0', borderRadius: '50%',
        animation: 'spin 0.8s linear infinite', margin: '0 auto 10px',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <span style={{ fontSize: 14 }}>Chargement des rendez-vous...</span>
    </div>
  )
}

export function AppointmentSkeleton() {
  const bar = (w) => (
    <div style={{ height: 12, width: w, background: '#e0e0e0', borderRadius: 4, marginBottom: 6 }} />
  )
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {[1, 2, 3].map(i => (
        <li key={i} style={{ padding: '12px', border: '1px solid #e0e0e0', borderRadius: 6, marginBottom: 10 }}>
          {bar('70%')}
          {bar('40%')}
        </li>
      ))}
    </ul>
  )
}
