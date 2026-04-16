import { useAppointments } from './hooks/useAppointments'
import { AppointmentForm } from './components/AppointmentForm'
import { AppointmentsPage } from './pages/AppointmentsPage'

function App() {
  const { create, creating, error } = useAppointments()

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f9' }}>
      <header style={{ background: '#1565c0', color: '#fff', padding: '14px 24px', marginBottom: 0 }}>
        <h1 style={{ margin: 0, fontSize: 20 }}>🏥 Salus — Assistant Santé</h1>
      </header>
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

export default App
