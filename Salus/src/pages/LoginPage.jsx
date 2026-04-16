import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      login(form.email, form.password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = { width: '100%', padding: '10px 12px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: 6, fontSize: 14, marginBottom: 14 }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.1)', width: '100%', maxWidth: 380 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 40 }}>🏥</div>
          <h2 style={{ margin: '8px 0 4px', color: '#1565c0' }}>Salus</h2>
          <p style={{ margin: 0, color: '#888', fontSize: 14 }}>Connectez-vous à votre espace santé</p>
        </div>

        {error && (
          <p style={{ color: '#c62828', background: '#fdecea', padding: '8px 12px', borderRadius: 6, fontSize: 13, marginBottom: 14 }}>
            ⚠️ {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="exemple@email.com" style={inputStyle} />
          <label style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>Mot de passe</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" style={inputStyle} />
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '11px', background: '#1565c0', color: '#fff', border: 'none', borderRadius: 6, fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}
