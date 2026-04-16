const BASE_URL = 'https://jsonplaceholder.typicode.com'

// Simule POST /auth/login — JSONPlaceholder ne fournit pas d'endpoint auth,
// on utilise POST /users pour simuler et on génère un token côté client
export async function loginApi(email, password) {
  if (!email || !password) throw new Error('Email et mot de passe requis')

  // Simulation appel auth — en prod remplacer par le vrai endpoint
  const res = await fetch(`${BASE_URL}/users?email=${encodeURIComponent(email)}`)
  if (!res.ok) throw new Error(`Échec authentification (${res.status})`)

  // Génère un token simulé signé avec timestamp
  const token = btoa(JSON.stringify({ email, iat: Date.now(), exp: Date.now() + 3600000 }))

  return { token, userId: 1 }
}
