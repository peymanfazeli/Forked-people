import { useEffect, useState } from 'react'
import type { Character } from '../types'
import { audio } from '../engine/audio'
import { useLanguage } from '../i18n/useLanguage'

interface Props {
  character: Character
  onComplete: () => void
}

const FINAL_STEP = 4
const STEP_DELAYS = [0, 700, 1400, 2100, 2400]

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export default function IdentityReveal({ character, onComplete }: Props) {
  const [step, setStep] = useState(() => (prefersReducedMotion() ? FINAL_STEP : 0))
  const { t } = useLanguage()

  useEffect(() => {
    audio.play('reveal')
    if (prefersReducedMotion()) return
    const timers = STEP_DELAYS.map((delay, i) =>
      setTimeout(() => setStep(i), delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  const complete = step >= FINAL_STEP
  const instant = complete || prefersReducedMotion()
  const active = (n: number) => instant || step >= n

  const handleTap = () => {
    if (!complete) setStep(FINAL_STEP)
  }

  return (
    <div
      className={`screen reveal-screen${instant ? ' reveal-instant' : ''}`}
      onClick={handleTap}
      aria-live="polite"
    >
      <div className="reveal-content glass">
        <p className={`reveal-line reveal-line-1${active(0) ? ' is-active' : ''}`}>
          {t('journeyComplete')}
        </p>

        <p className={`reveal-line reveal-line-2${active(1) ? ' is-active' : ''}`}>
          {t('youWereLiving')}
        </p>

        <div className={`reveal-identity${active(2) ? ' is-active' : ''}`}>
          <h1 className={`reveal-name${active(2) ? ' is-active' : ''}`}>
            {character.name}
          </h1>
          <div className="reveal-timeline">
            <span className={`reveal-year reveal-year-start${active(2) ? ' is-active' : ''}`}>
              {character.birthYear}
            </span>
            <span className={`reveal-rule${active(2) ? ' is-active' : ''}`} aria-hidden="true" />
            <span className={`reveal-year reveal-year-end${active(2) ? ' is-active' : ''}`}>
              {character.deathYear ?? t('present')}
            </span>
          </div>
        </div>

        <p className={`reveal-description${active(3) ? ' is-active' : ''}`}>
          {character.description}
        </p>

        <button
          className={`btn btn-primary reveal-cta${active(4) ? ' is-active' : ''}`}
          onClick={onComplete}
          tabIndex={active(4) ? 0 : -1}
          aria-hidden={!active(4)}
        >
          {t('seeYourResults')}
        </button>
      </div>
    </div>
  )
}
