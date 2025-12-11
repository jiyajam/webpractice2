import { useState } from 'react'

export default function useSignup(url) {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const signup = async (object) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(object),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Signup failed')
        setIsLoading(false)
        return null
      }

      localStorage.setItem('user', JSON.stringify(data))
      setIsLoading(false)
      return data
    } catch (err) {
      setError(err.message || 'Network error')
      setIsLoading(false)
      return null
    }
  }

  return { signup, isLoading, error }
}
