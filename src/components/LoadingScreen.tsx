import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../i18n/useLanguage'

interface Props {
  progress: number
  onComplete: () => void
}

const EXIT_DURATION = 900

export default function LoadingScreen({ progress, onComplete }: Props) {
  const { t } = useLanguage()
  const [exiting, setExiting] = useState(false)
  const fired = useRef(false)

  useEffect(() => {
    if (progress >= 1 && !fired.current) {
      fired.current = true
      setExiting(true)
      const id = setTimeout(onComplete, EXIT_DURATION)
      return () => clearTimeout(id)
    }
  }, [progress, onComplete])

  const pct = Math.round(progress * 100)

  return (
    <div className={`loading-screen${exiting ? ' loading-exit' : ''}`} aria-live="polite">
      <div className="loading-orbits" aria-hidden="true">
        <div className="loading-ring loading-ring-inner">
          <span className="loading-dot loading-dot-amber" />
          <span className="loading-dot loading-dot-cyan" />
          <span className="loading-dot loading-dot-amber" />
          <span className="loading-dot loading-dot-cyan" />
        </div>
        <div className="loading-ring loading-ring-outer">
          <span className="loading-dot loading-dot-cyan" />
          <span className="loading-dot loading-dot-amber" />
          <span className="loading-dot loading-dot-cyan" />
          <span className="loading-dot loading-dot-amber" />
        </div>
        <div className="loading-center">
          <span className="loading-logo">Fork</span>
        </div>
      </div>

      <div className="loading-bar-wrap">
        <div className="loading-bar-track">
          <div className="loading-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="loading-status">{t('loading')}</span>
      </div>
    </div>
  )
}
