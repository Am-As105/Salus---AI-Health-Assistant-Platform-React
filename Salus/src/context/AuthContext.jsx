import { createContext, useContext, useState } from 'react'
import { getMe } from '../api/userApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('salus_user')
    return saved ? JSON.parse(saved) : null
  })
  const [profileLoading, setProfileLoading] = useState(false)

  const login = async (email, password) => {
    if (!email || !password) throw new Error('Email et mot de passe requis')
    const base = { email, name: email.split('@')[0], id: 1 }
    localStorage.setItem('salus_user', JSON.stringify(base))
    setUser(base)
    setProfileLoading(true)
    try {
      const profile = await getMe(base.id)
      const enriched = { ...base, ...profile }
      localStorage.setItem('salus_user', JSON.stringify(enriched))
      setUser(enriched)
    } catch (_) {
      // profil non critique, on garde les infos de base
    } finally {
      setProfileLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('salus_user')
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
