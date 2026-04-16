const BASE_URL = 'https://jsonplaceholder.typicode.com'

export async function cancelAppointment(id) {
  const res = await fetch(`${BASE_URL}/todos/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`Échec annulation (${res.status})`)
  return id
}
