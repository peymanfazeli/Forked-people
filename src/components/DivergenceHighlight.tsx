import type { ScoreResult } from '../types'

interface Props {
  divergence: NonNullable<ScoreResult['biggestDivergence']>
}

export default function DivergenceHighlight({ divergence }: Props) {
  const { event, playerChoice, historicalChoice } = divergence
  const playerChoiceData = playerChoice === 'yes' ? event.yes : event.no
  const historicalChoiceData = historicalChoice === 'yes' ? event.yes : event.no
  const playerConsequence = playerChoiceData.historicalConsequence ?? playerChoiceData.consequence
  const historicalConsequence = historicalChoiceData.historicalConsequence ?? historicalChoiceData.consequence

  return (
    <div className="divergence">
      <h3 className="divergence-title">Your Biggest Divergence</h3>
      <p className="divergence-year">{event.year}</p>
      <p className="divergence-event">{event.title}</p>
      <p className="divergence-historical">{event.historicalFact}</p>
      <div className="divergence-paths">
        <div className="divergence-path">
          <span className="divergence-path-label">Your path</span>
          <span className="divergence-path-value">{playerChoice === 'yes' ? 'YES' : 'NO'}</span>
          <span className="divergence-path-detail">{playerConsequence}</span>
        </div>
        <div className="divergence-path">
          <span className="divergence-path-label">Real history</span>
          <span className="divergence-path-value">{historicalChoice === 'yes' ? 'YES' : 'NO'}</span>
          <span className="divergence-path-detail">{historicalConsequence}</span>
        </div>
      </div>
    </div>
  )
}
