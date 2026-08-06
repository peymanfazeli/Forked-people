import type { ScoreResult } from '../types'
import { useLanguage } from '../i18n/useLanguage'

interface Props {
  divergence: NonNullable<ScoreResult['biggestDivergence']>
}

export default function DivergenceHighlight({ divergence }: Props) {
  const { t } = useLanguage()
  const { event, playerChoice, historicalChoice } = divergence
  const playerChoiceData = playerChoice === 'yes' ? event.yes : event.no
  const historicalChoiceData = historicalChoice === 'yes' ? event.yes : event.no
  const playerConsequence = playerChoiceData.historicalConsequence ?? playerChoiceData.consequence
  const historicalConsequence = historicalChoiceData.historicalConsequence ?? historicalChoiceData.consequence

  return (
    <div className="divergence">
      <div className="divergence-head">
        <span className="divergence-year">{event.year}</span>
        <h3 className="divergence-title">{t('biggestDivergence')}</h3>
      </div>
      <p className="divergence-event">{event.title}</p>
      <p className="divergence-historical">{event.historicalFact}</p>
      <div className="divergence-paths">
        <div className="divergence-path">
          <div className="divergence-path-head">
            <span className="divergence-path-label">{t('yourPath')}</span>
            <span className="divergence-chip divergence-chip-player">
              {playerChoice === 'yes' ? t('yes') : t('no')}
            </span>
          </div>
          <span className="divergence-path-detail">{playerConsequence}</span>
        </div>
        <div className="divergence-path">
          <div className="divergence-path-head">
            <span className="divergence-path-label">{t('realHistory')}</span>
            <span className="divergence-chip divergence-chip-history">
              {historicalChoice === 'yes' ? t('yes') : t('no')}
            </span>
          </div>
          <span className="divergence-path-detail">{historicalConsequence}</span>
        </div>
      </div>
    </div>
  )
}
