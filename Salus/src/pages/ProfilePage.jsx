import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useMe } from '../hooks/useMe'
import { UserProfile } from '../components/UserProfile'

export function ProfilePage() {
  const { user } = useAuth()
  const { profile, loading, error, refetch } = useMe(user?.id)

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f9' }}>
      <header style={{ background: '#1565c0', color: '#fff', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: 20 }}>←</Link>
        <h1 style={{ margin: 0, fontSize: 18 }}>Mon profil</h1>
      </header>
      <div style={{ maxWidth: 480, margin: '32px auto', padding: '0 16px' }}>
        <UserProfile profile={profile} loading={loading} error={error} onRefetch={refetch} />
      </div>
    </div>
  )
}
