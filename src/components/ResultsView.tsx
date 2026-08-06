import { useMemo, useEffect, useState } from 'react'
import type { Character, CompletedEvent } from '../types'
import { calculateResults } from '../engine/scoring'
import { audio } from '../engine/audio'
import DivergenceHighlight from './DivergenceHighlight'
import { useLanguage } from '../i18n/useLanguage'

interface Props {
  character: Character
  completedEvents: CompletedEvent[]
  onReplay: () => void
  onBackToSelect: () => void
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

const EASE_OUT_CUBIC = (t: number) => 1 - Math.pow(1 - t, 3)

function useCountUp(
  target: number,
  started: boolean,
  duration: number,
  startDelay = 0
): number {
  const [value, setValue] = useState(() =>
    prefersReducedMotion() ? target : 0
  )

  useEffect(() => {
    if (!started) return
    if (prefersReducedMotion()) {
      setValue(target)
      return
    }

    let raf = 0
    const timer = setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        setValue(target * EASE_OUT_CUBIC(t))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, startDelay)

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [started, target, duration, startDelay])

  return value
}

const RING_SIZE = 160
const RING_STROKE = 10
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

function ScoreRing({
  value,
  started,
  delay,
}: {
  value: number
  started: boolean
  delay: number
}) {
  const current = useCountUp(value, started, 1200, delay)
  const offset = RING_CIRCUMFERENCE * (1 - current / 100)

  return (
    <div className="score-ring" style={{ width: RING_SIZE, height: RING_SIZE }}>
      <svg viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`} aria-hidden="true">
        <circle
          className="score-ring-track"
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
        />
        <circle
          className="score-ring-fill"
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="score-ring-value">{Math.round(current)}%</span>
    </div>
  )
}

function AnimatedBar({
  label,
  value,
  started,
  delay,
}: {
  label: string
  value: number
  started: boolean
  delay: number
}) {
  const current = useCountUp(value, started, 900, delay)

  return (
    <div className="score-bar">
      <span className="score-bar-label">{label}</span>
      <div
        className="score-bar-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(current)}
        aria-label={label}
      >
        <div className="score-bar-fill" style={{ width: `${current}%` }} />
      </div>
      <span className="score-bar-value">{Math.round(current)}%</span>
    </div>
  )
}

export default function ResultsView({
  character,
  completedEvents,
  onReplay,
  onBackToSelect,
}: Props) {
  const { t } = useLanguage()
  const results = useMemo(
    () => calculateResults(character, completedEvents),
    [character, completedEvents]
  )

  const [started, setStarted] = useState(false)

  useEffect(() => {
    audio.play('complete')
    const id = setTimeout(() => setStarted(true), 200)
    return () => clearTimeout(id)
  }, [])

  const identityYears = `${character.birthYear}\u2013${character.deathYear ?? t('present')}`

  return (
    <div className="screen results-screen">
      <div className="results-content">
        <p className="results-kicker">
          {t('youMadeDecisions', { count: completedEvents.length })}
        </p>

        <h2 className="results-heading">{character.ending.title}</h2>

        <p className="results-identity">
          {character.name} &middot; {identityYears}
        </p>

        <div className="results-hero glass-card">
          <ScoreRing
            value={results.historicalSimilarity}
            started={started}
            delay={300}
          />
          <span className="results-hero-label">{t('historicalSimilarity')}</span>
        </div>

        <div className="results-bars glass-card">
          <AnimatedBar
            label={t('riskTaking')}
            value={results.risk}
            started={started}
            delay={450}
          />
          <AnimatedBar
            label={t('independence')}
            value={results.independence}
            started={started}
            delay={550}
          />
        </div>

        {results.biggestDivergence && (
          <DivergenceHighlight divergence={results.biggestDivergence} />
        )}

        <div className="results-actions">
          <button className="btn btn-primary" onClick={onReplay}>
            {t('playAgain')}
          </button>
          <button className="btn btn-secondary" onClick={onBackToSelect}>
            {t('anotherLife')}
          </button>
        </div>
      </div>
    </div>
  )
}
