import { useState, useMemo } from 'react'

export function useAppointmentFilters(appointments) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date_asc')

  const filtered = useMemo(() => {
    let list = [...appointments]

    if (statusFilter !== 'all')
      list = list.filter(a => a.status === statusFilter)

    if (search.trim())
      list = list.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        (a.doctor && a.doctor.toLowerCase().includes(search.toLowerCase()))
      )

    list.sort((a, b) => {
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name)
      if (sortBy === 'name_desc') return b.name.localeCompare(a.name)
      if (sortBy === 'date_desc') return (b.date || '').localeCompare(a.date || '')
      return (a.date || '').localeCompare(b.date || '')
    })

    return list
  }, [appointments, search, statusFilter, sortBy])

  return { filtered, search, setSearch, statusFilter, setStatusFilter, sortBy, setSortBy }
}
