import { useState } from 'react'
import { validateAppointmentForm } from '../utils/formValidation'

const EMPTY = {
  patientName: '',
  phone: '',
  specialty: '',
  doctor: '',
  date: '',
  time: '',
  type: 'presentiel',
  notes: '',
}

export function useAppointmentForm(onCreate) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleTimeSelect = (time) => {
    setForm(prev => ({ ...prev, time }))
    if (errors.time) setErrors(prev => ({ ...prev, time: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validateAppointmentForm(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    await onCreate({ ...form, name: `${form.specialty} — ${form.patientName}` })
    setForm(EMPTY)
    setErrors({})
  }

  return { form, errors, handleChange, handleTimeSelect, handleSubmit }
}
