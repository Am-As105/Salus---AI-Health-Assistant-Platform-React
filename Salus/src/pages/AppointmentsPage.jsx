import { useAppointments } from '../hooks/useAppointments'
import { useAppointmentFilters } from '../hooks/useAppointmentFilters'
import { AppointmentFilters } from '../components/AppointmentFilters'
import { AppointmentCard } from '../components/AppointmentCard'
import { AppointmentSkeleton } from '../components/LoadingSpinner'

function StatBadge({ label, value, color }) {
  return (
    <div style={{ textAlign: 'center', padding: '10px 20px', background: '#fff', borderRadius: 8, border: '1px solid #e0e0e0', minWidth: 90 }}>
      <div style={{ fontSize: 22, fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: 12, color: '#666' }}>{label}</div>
    </div>
  )
}

export function AppointmentsPage({ onCreate, creating }) {
  const { appointments, cancel, loading, fetching, error } = useAppointments()
  const { filtered, search, setSearch, statusFilter, setStatusFilter, sortBy, setSortBy } = useAppointmentFilters(appointments)

  const active = appointments.filter(a => a.status === 'active').length
  const cancelled = appointments.filter(a => a.status === 'cancelled').length

  return (
    <div style={{ maxWidth: 620, margin: '0 auto', padding: '24px 16px', fontFamily: 'sans-serif' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, color: '#1a1a1a' }}>📋 Mes rendez-vous</h2>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#888' }}>Gérez vos consultations médicales</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <StatBadge label="Total" value={appointments.length} color="#1565c0" />
        <StatBadge label="Actifs" value={active} color="#2e7d32" />
        <StatBadge label="Annulés" value={cancelled} color="#c62828" />
      </div>

      {error && (
        <p style={{ color: '#c62828', background: '#fdecea', padding: '10px 14px', borderRadius: 6, marginBottom: 16 }}>
          ⚠️ {error}
        </p>
      )}

      <AppointmentFilters
        search={search} onSearch={setSearch}
        statusFilter={statusFilter} onStatusFilter={setStatusFilter}
        sortBy={sortBy} onSort={setSortBy}
        total={appointments.length} filtered={filtered.length}
      />

      {fetching ? (
        <AppointmentSkeleton />
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#aaa' }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>📭</div>
          <p style={{ margin: 0 }}>Aucun rendez-vous trouvé</p>
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {filtered.map(a => (
            <AppointmentCard key={a.id} appointment={a} onCancel={cancel} loading={loading} />
          ))}
        </ul>
      )}
    </div>
  )
}
