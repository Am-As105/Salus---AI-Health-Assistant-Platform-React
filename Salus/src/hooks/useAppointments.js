import { useState } from 'react'
import { cancelAppointment } from '../api/appointmentApi'

const INITIAL = [
  { id: 1, name: 'Consultation Dr. Martin', status: 'active' },
  { id: 2, name: 'Prise de médicaments', status: 'active' },
  { id: 3, name: 'Rendez-vous analyse sanguine', status: 'active' },
]

export function useAppointments() {
  const [appointments, setAppointments] = useState(INITIAL)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  const cancel = async (id) => {
    setLoading(id)
    setError(null)
    try {
      await cancelAppointment(id)
      setAppointments(prev =>
        prev.map(a => a.id === id ? { ...a, status: 'cancelled' } : a)
      )
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(null)
    }
  }

  return { appointments, cancel, loading, error }
}
