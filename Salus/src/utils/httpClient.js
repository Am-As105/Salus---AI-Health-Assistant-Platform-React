import { tokenStorage } from './tokenStorage'

export async function httpClient(url, options = {}) {
  const token = tokenStorage.getToken()

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const res = await fetch(url, { ...options, headers })

  if (res.status === 401) {
    tokenStorage.clear()
    window.location.href = '/login'
    throw new Error('Session expirée, veuillez vous reconnecter')
  }

  if (!res.ok) throw new Error(`Erreur HTTP (${res.status})`)

  return res.status === 204 ? null : res.json()
}
