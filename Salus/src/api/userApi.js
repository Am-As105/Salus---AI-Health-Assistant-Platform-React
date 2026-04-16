import { httpClient } from '../utils/httpClient'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export async function getMe(userId = 1) {
  const u = await httpClient(`${BASE_URL}/users/${userId}`)
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
