const BASE_URL = 'https://jsonplaceholder.typicode.com'

export async function getMe(userId = 1) {
  const res = await fetch(`${BASE_URL}/users/${userId}`)
  if (!res.ok) throw new Error(`Échec récupération profil (${res.status})`)
  const u = await res.json()
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone,
    website: u.website,
    company: u.company?.name,
    address: `${u.address?.street}, ${u.address?.city}`,
  }
}
