import { useState, useEffect } from 'react'
import { cancelAppointment, createAppointment, fetchAppointments } from '../api/appointmentApi'

const INITIAL = [
  { id: 1, name: 'Consultation Dr. Martin', status: 'active' },
  { id: 2, name: 'Prise de médicaments', status: 'active' },
  { id: 3, name: 'Rendez-vous analyse sanguine', status: 'active' },
]

export function useAppointments() {
  const [appointments, setAppointments] = useState([])
  const [fetching, setFetching] = useState(true)
  const [loading, setLoading] = useState(null)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAppointments()
      .then(setAppointments)
      .catch(err => setError(err.message))
      .finally(() => setFetching(false))
  }, [])

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

  const create = async (data) => {
    setCreating(true)
    setError(null)
    try {
      const newAppointment = await createAppointment(data)
      setAppointments(prev => [newAppointment, ...prev])
    } catch (err) {
      setError(err.message)
    } finally {
      setCreating(false)
    }
  }

  return { appointments, cancel, create, loading, creating, fetching, error }
}
