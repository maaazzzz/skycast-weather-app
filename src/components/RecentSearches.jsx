export default function RecentSearches({ cities, onSelect, onClear }) {
  if (!cities || cities.length === 0) return null

  return (
    <div className="recent-searches">
      <span className="recent-label">Recent:</span>
      {cities.map((city) => (
        <button
          key={city}
          onClick={() => onSelect(city)}
          className="recent-pill"
          aria-label={`Search ${city} again`}
        >
          🕒 {city}
        </button>
      ))}
      <button onClick={onClear} className="recent-clear" aria-label="Clear recent searches">
        Clear
      </button>
    </div>
  )
}
