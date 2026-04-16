import { httpClient } from '../utils/httpClient'

const BASE_URL = 'https://jsonplaceholder.typicode.com'
const LIMIT = 5

export async function fetchAppointments() {
  const data = await httpClient(`${BASE_URL}/todos?_limit=${LIMIT}`)
  return data.map(item => ({
    id: item.id,
    name: item.title,
    doctor: '',
    date: '',
    status: item.completed ? 'cancelled' : 'active',
  }))
}

export async function cancelAppointment(id) {
  await httpClient(`${BASE_URL}/todos/${id}`, { method: 'DELETE' })
  return id
}

export async function createAppointment(data) {
  const json = await httpClient(`${BASE_URL}/todos`, {
    method: 'POST',
    body: JSON.stringify({ title: data.name, completed: false }),
  })
  return { id: json.id, name: data.name, doctor: data.doctor, date: data.date, status: 'active' }
}
