import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('salus_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = (email, password) => {
    if (!email || !password) throw new Error('Email et mot de passe requis')
    const userData = { email, name: email.split('@')[0] }
    localStorage.setItem('salus_user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('salus_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
