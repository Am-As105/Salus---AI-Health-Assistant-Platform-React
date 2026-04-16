import { useState, useEffect, useCallback } from 'react'
import { getMe } from '../api/userApi'

export function useMe(userId) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetch = useCallback(() => {
    if (!userId) return
    setLoading(true)
    setError(null)
    getMe(userId)
      .then(setProfile)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [userId])

  useEffect(() => { fetch() }, [fetch])

  return { profile, loading, error, refetch: fetch }
}
