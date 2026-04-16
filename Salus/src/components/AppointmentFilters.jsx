import { STATUS_FILTERS, SORT_OPTIONS } from '../constants/filterOptions'

export function AppointmentFilters({ search, onSearch, statusFilter, onStatusFilter, sortBy, onSort, total, filtered }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <input
        value={search}
        onChange={e => onSearch(e.target.value)}
        placeholder="🔍 Rechercher par nom ou médecin..."
        style={{ width: '100%', padding: '8px 12px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: 6, fontSize: 14, marginBottom: 10 }}
      />
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {STATUS_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => onStatusFilter(f.value)}
              style={{
                padding: '4px 12px', borderRadius: 20, fontSize: 13, cursor: 'pointer',
                border: `1px solid ${statusFilter === f.value ? '#1565c0' : '#ccc'}`,
                background: statusFilter === f.value ? '#1565c0' : '#fff',
                color: statusFilter === f.value ? '#fff' : '#333',
                fontWeight: statusFilter === f.value ? 600 : 400,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
        <select
          value={sortBy}
          onChange={e => onSort(e.target.value)}
          style={{ marginLeft: 'auto', padding: '4px 8px', border: '1px solid #ccc', borderRadius: 4, fontSize: 13 }}
        >
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      <p style={{ color: '#888', fontSize: 12, margin: '8px 0 0' }}>
        {filtered} résultat{filtered > 1 ? 's' : ''} sur {total}
      </p>
    </div>
  )
}
