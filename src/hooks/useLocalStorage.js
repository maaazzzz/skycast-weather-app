import { useState, useEffect } from 'react'

// Custom hook that syncs a piece of React state with localStorage.
// Usage: const [recent, setRecent] = useLocalStorage('recent-cities', [])
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch (err) {
      console.error('localStorage read error:', err)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error('localStorage write error:', err)
    }
  }, [key, value])

  return [value, setValue]
}
