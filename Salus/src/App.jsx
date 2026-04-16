import { useAppointments } from './hooks/useAppointments'
import { AppointmentList } from './components/AppointmentList'

function App() {
  const { appointments, cancel, loading, error } = useAppointments()

  return (
    <div style={{ maxWidth: 520, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Salus — Mes rendez-vous</h2>
      {error && (
        <p style={{ color: '#c62828', background: '#fdecea', padding: '8px 12px', borderRadius: 4 }}>
          ⚠️ {error}
        </p>
      )}
      <AppointmentList appointments={appointments} onCancel={cancel} loading={loading} />
      <p style={{ color: '#666', fontSize: 13 }}>
        {appointments.filter(a => a.status === 'cancelled').length} / {appointments.length} annulés
      </p>
    </div>
  )
}

export default App
