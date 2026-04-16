import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { AppointmentsPage } from './AppointmentsPage'
import { AppointmentForm } from '../components/AppointmentForm'
import { useAppointments } from '../hooks/useAppointments'

function Navbar({ user, onLogout }) {
  return (
    <header style={{ background: '#1565c0', color: '#fff', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 18 }}>🏥 Salus</Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 14 }}>👤 {user.name}</span>
        <button
          onClick={onLogout}
          style={{ padding: '5px 14px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}
        >
          Déconnexion
        </button>
      </div>
    </header>
  )
}

export function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { create, creating, error } = useAppointments()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f9' }}>
      <Navbar user={user} onLogout={handleLogout} />
      <div style={{ maxWidth: 620, margin: '24px auto', padding: '0 16px' }}>
        {error && (
          <p style={{ color: '#c62828', background: '#fdecea', padding: '10px 14px', borderRadius: 6, marginBottom: 16 }}>
            ⚠️ {error}
          </p>
        )}
        <AppointmentForm onCreate={create} creating={creating} />
      </div>
      <AppointmentsPage />
    </div>
  )
}
