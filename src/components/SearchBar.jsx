import { useState } from 'react'

export default function SearchBar({ onSearch, onLocate, unit, onToggleUnit }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (trimmed) {
      onSearch(trimmed)
      setInput('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for a city..."
          aria-label="Search for a city"
          className="search-input"
        />
      </div>
      <button type="submit" className="btn btn-primary">Search</button>
      <button type="button" onClick={onLocate} className="btn btn-secondary" aria-label="Use my location">
        📍 My location
      </button>
      <button type="button" onClick={onToggleUnit} className="btn btn-toggle" aria-label="Toggle temperature unit">
        °{unit === 'C' ? 'C' : 'F'} <span className="toggle-sub">/ °{unit === 'C' ? 'F' : 'C'}</span>
      </button>
    </form>
  )
}
