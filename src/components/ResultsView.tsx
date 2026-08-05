import { useMemo, useEffect } from 'react'
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

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="score-bar">
      <span className="score-bar-label">{label}</span>
      <div className="score-bar-track">
        <div
          className="score-bar-fill"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="score-bar-value">{value}%</span>
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

  useEffect(() => {
    audio.play('complete')
  }, [])

  return (
    <div className="screen results-screen">
      <div className="results-content glass">
        <h2 className="results-heading">{character.ending.title}</h2>
        <p className="results-subtitle">
          {t('youMadeDecisions', { count: completedEvents.length })}
        </p>

        <div className="results-scores">
          <div className="results-main-score glass-card">
            <span className="results-main-value">{results.historicalSimilarity}%</span>
            <span className="results-main-label">{t('historicalSimilarity')}</span>
          </div>

          <ScoreBar label={t('riskTaking')} value={results.risk} />
          <ScoreBar label={t('independence')} value={results.independence} />
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
