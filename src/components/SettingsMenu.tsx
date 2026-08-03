import { useEffect, useRef, useState } from 'react'
import { audio } from '../engine/audio'

export default function SettingsMenu() {
  const [open, setOpen] = useState(false)
  const [volume, setVolume] = useState(audio.volume)
  const [bgMusic, setBgMusic] = useState(audio.bgMusic)
  const [clickEnabled, setClickEnabled] = useState(audio.clickEnabled)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    modalRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const handleVolume = (v: number) => {
    setVolume(v)
    audio.setVolume(v)
  }

  return (
    <>
      <button
        className="settings-btn"
        aria-label="Open settings"
        onClick={() => setOpen(true)}
      >
        <img src="/settings.png" alt="" />
      </button>

      {open && (
        <div className="settings-overlay" onClick={() => setOpen(false)}>
          <div
            ref={modalRef}
            className="settings-modal glass"
            role="dialog"
            aria-modal="true"
            aria-label="Audio settings"
            tabIndex={-1}
            onClick={e => e.stopPropagation()}
          >
            <div className="settings-header">
              <h2 className="settings-title">Settings</h2>
              <button
                className="settings-close"
                onClick={() => setOpen(false)}
                aria-label="Close settings"
              >
                &times;
              </button>
            </div>

            <div className="settings-row">
              <span className="settings-label" id="settings-volume-label">
                Sound volume
              </span>
              <input
                className="settings-range"
                type="range"
                min={0}
                max={100}
                value={Math.round(volume * 100)}
                aria-labelledby="settings-volume-label"
                onChange={e => handleVolume(Number(e.target.value) / 100)}
              />
              <span className="settings-value">{Math.round(volume * 100)}%</span>
            </div>

            <div className="settings-row">
              <span className="settings-label">Background music</span>
              <button
                className={`settings-toggle${bgMusic ? ' on' : ''}`}
                role="switch"
                aria-checked={bgMusic}
                onClick={() => {
                  const next = !bgMusic
                  setBgMusic(next)
                  audio.setBackgroundMusic(next)
                }}
              >
                <span className="settings-toggle-thumb" />
              </button>
            </div>

            <div className="settings-row">
              <span className="settings-label">Click sounds</span>
              <button
                className={`settings-toggle${clickEnabled ? ' on' : ''}`}
                role="switch"
                aria-checked={clickEnabled}
                onClick={() => {
                  const next = !clickEnabled
                  setClickEnabled(next)
                  audio.setClickEnabled(next)
                }}
              >
                <span className="settings-toggle-thumb" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
