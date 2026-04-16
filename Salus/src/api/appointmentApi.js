const BASE_URL = 'https://jsonplaceholder.typicode.com'
const LIMIT = 5

export async function fetchAppointments() {
  const res = await fetch(`${BASE_URL}/todos?_limit=${LIMIT}`)
  if (!res.ok) throw new Error(`Échec récupération (${res.status})`)
  const json = await res.json()
  return json.map(item => ({
    id: item.id,
    name: item.title,
    doctor: '',
    date: '',
    status: item.completed ? 'cancelled' : 'active',
  }))
}

export async function cancelAppointment(id) {
  const res = await fetch(`${BASE_URL}/todos/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`Échec annulation (${res.status})`)
  return id
}

export async function createAppointment(data) {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: data.name, completed: false }),
  })
  if (!res.ok) throw new Error(`Échec création (${res.status})`)
  const json = await res.json()
  return { id: json.id, name: data.name, doctor: data.doctor, date: data.date, status: 'active' }
}
