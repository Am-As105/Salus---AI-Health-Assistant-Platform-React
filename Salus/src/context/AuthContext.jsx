import { createContext, useContext, useState } from 'react'
import { getMe } from '../api/userApi'
import { loginApi } from '../api/authApi'
import { tokenStorage } from '../utils/tokenStorage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => tokenStorage.getUser())
  const [profileLoading, setProfileLoading] = useState(false)

  const login = async (email, password) => {
    const { token, userId } = await loginApi(email, password)
    tokenStorage.setToken(token)

    const base = { email, name: email.split('@')[0], id: userId }
    tokenStorage.setUser(base)
    setUser(base)

    setProfileLoading(true)
    try {
      const profile = await getMe(userId)
      const enriched = { ...base, ...profile }
      tokenStorage.setUser(enriched)
      setUser(enriched)
    } catch (_) {
      // profil non critique, on garde les infos de base
    } finally {
      setProfileLoading(false)
    }
  }

  const logout = () => {
    tokenStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, profileLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
