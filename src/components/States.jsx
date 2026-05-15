export function LoadingState() {
  return (
    <div className="state-card glass-card">
      <div className="spinner" aria-hidden="true"></div>
      <p className="state-text">Fetching weather...</p>
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state-card glass-card error-card">
      <div className="error-icon" aria-hidden="true">⚠️</div>
      <p className="state-text">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-primary">Try again</button>
      )}
    </div>
  )
}

export function EmptyState() {
  return (
    <div className="state-card glass-card">
      <div className="empty-icon" aria-hidden="true">🌍</div>
      <p className="state-text">Search for a city or use your location to get started.</p>
    </div>
  )
}
