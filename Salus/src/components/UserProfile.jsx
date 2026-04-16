export function UserProfile({ profile, loading, error, onRefetch }) {
  if (loading)
    return (
      <div style={{ padding: 24, textAlign: 'center', color: '#1565c0' }}>
        <div style={{ width: 32, height: 32, border: '3px solid #e3f2fd', borderTop: '3px solid #1565c0', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 10px' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        <span style={{ fontSize: 14 }}>Chargement du profil...</span>
      </div>
    )

  if (error)
    return (
      <div style={{ padding: 16, background: '#fdecea', borderRadius: 8, color: '#c62828' }}>
        <p style={{ margin: '0 0 10px' }}>⚠️ {error}</p>
        <button onClick={onRefetch} style={{ padding: '5px 14px', background: '#c62828', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}>
          Réessayer
        </button>
      </div>
    )

  if (!profile) return null

  const row = (icon, label, value) => value ? (
    <div style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid #f0f0f0', alignItems: 'flex-start' }}>
      <span style={{ fontSize: 18, minWidth: 24 }}>{icon}</span>
      <div>
        <div style={{ fontSize: 11, color: '#999', textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</div>
        <div style={{ fontSize: 14, color: '#222', marginTop: 2 }}>{value}</div>
      </div>
    </div>
  ) : null

  return (
    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
      <div style={{ background: 'linear-gradient(135deg, #1565c0, #1976d2)', padding: '28px 24px', textAlign: 'center', color: '#fff' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 12px' }}>
          👤
        </div>
        <h2 style={{ margin: '0 0 4px', fontSize: 20 }}>{profile.name}</h2>
        <p style={{ margin: 0, fontSize: 13, opacity: 0.85 }}>{profile.email}</p>
      </div>
      <div style={{ padding: '8px 20px 16px' }}>
        {row('📞', 'Téléphone', profile.phone)}
        {row('🏢', 'Entreprise', profile.company)}
        {row('📍', 'Adresse', profile.address)}
        {row('🌐', 'Site web', profile.website)}
      </div>
    </div>
  )
}
