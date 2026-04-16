import { TIME_SLOTS } from '../constants/specialties'

export function TimeSlotPicker({ selected, onSelect, error }) {
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {TIME_SLOTS.map(slot => (
          <button
            key={slot}
            type="button"
            onClick={() => onSelect(slot)}
            style={{
              padding: '6px 12px',
              borderRadius: 4,
              border: `1px solid ${selected === slot ? '#1565c0' : '#ccc'}`,
              background: selected === slot ? '#1565c0' : '#fff',
              color: selected === slot ? '#fff' : '#333',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: selected === slot ? 600 : 400,
            }}
          >
            {slot}
          </button>
        ))}
      </div>
      {error && <span style={{ color: '#c62828', fontSize: 12, marginTop: 4, display: 'block' }}>{error}</span>}
    </div>
  )
}
