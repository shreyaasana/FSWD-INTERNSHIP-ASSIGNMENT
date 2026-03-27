import { useState } from 'react'
import './App.css'

const MOODS = [
  { emoji: '😄', label: 'Excited', color: '#f59e0b' },
  { emoji: '😌', label: 'Calm', color: '#14b8a6' },
  { emoji: '😤', label: 'Frustrated', color: '#ef4444' },
  { emoji: '🥱', label: 'Bored', color: '#94a3b8' },
  { emoji: '🤩', label: 'Inspired', color: '#8b5cf6' },
  { emoji: '😔', label: 'Down', color: '#6366f1' },
]

function App() {
  const [activeMood, setActiveMood] = useState(null)
  const [moodLog, setMoodLog] = useState([])

  function selectMood(mood) {
    setActiveMood(mood)
  }

  function logCurrentMood() {
    if (!activeMood) return

    const entry = {
      ...activeMood,
      timestamp: new Date().toLocaleString(),
      id: Date.now(),
    }
    setMoodLog((prev) => [entry, ...prev])
  }

  function clearLog() {
    setMoodLog([])
    setActiveMood(null)
  }

  return (
    <div className="app-wrapper">
      <div className="card-container">
        <h1 className="app-title">Vibe Check</h1>
        <p className="app-subtitle">How are you feeling right now?</p>

        <div className="mood-buttons">
          {MOODS.map((mood) => (
            <button
              key={mood.label}
              className={`mood-circle ${activeMood?.label === mood.label ? 'selected' : ''}`}
              style={{
                borderColor: activeMood?.label === mood.label ? mood.color : 'transparent',
              }}
              onClick={() => selectMood(mood)}
              title={mood.label}
            >
              <span className="mood-emoji">{mood.emoji}</span>
              <span className="mood-label">{mood.label}</span>
            </button>
          ))}
        </div>

        {activeMood && (
          <div className="current-mood">
            <div
              className="mood-showcase"
              style={{ backgroundColor: activeMood.color + '22' }}
            >
              <span className="showcase-emoji">{activeMood.emoji}</span>
              <span className="showcase-text" style={{ color: activeMood.color }}>
                {activeMood.label}
              </span>
            </div>
            <button className="log-btn" onClick={logCurrentMood}>
              Log This Vibe
            </button>
          </div>
        )}

        {moodLog.length > 0 && (
          <div className="mood-history">
            <div className="history-header">
              <h2>Vibe History</h2>
              <button className="clear-btn" onClick={clearLog}>Clear All</button>
            </div>
            <ul className="history-list">
              {moodLog.map((entry) => (
                <li
                  key={entry.id}
                  className="history-entry"
                  style={{ borderLeftColor: entry.color }}
                >
                  <span className="entry-emoji">{entry.emoji}</span>
                  <div className="entry-info">
                    <span className="entry-label">{entry.label}</span>
                    <span className="entry-time">{entry.timestamp}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
