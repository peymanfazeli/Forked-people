import type { Character, CompletedEvent, GameEvent, ScoreResult } from '../types'

export function calculateResults(
  character: Character,
  completedEvents: CompletedEvent[]
): ScoreResult {
  let historicalWeight = 0
  let totalWeight = 0
  let riskSum = 0
  let independenceSum = 0
  let biggestDivergence: ScoreResult['biggestDivergence'] = null

  for (const evt of completedEvents) {
    const event = character.events.find(e => e.id === evt.eventId)
    if (!event) continue

    const choice = evt.choice === 'yes' ? event.yes : event.no
    totalWeight += event.weight

    if (choice.historical) {
      historicalWeight += event.weight
    }

    riskSum += choice.risk
    independenceSum += choice.independence

    const historicalChoice: 'yes' | 'no' = event.yes.historical ? 'yes' : 'no'
    if (evt.choice !== historicalChoice) {
      if (
        !biggestDivergence ||
        event.weight > biggestDivergence.event.weight
      ) {
        biggestDivergence = { event, playerChoice: evt.choice, historicalChoice }
      }
    }
  }

  const count = completedEvents.length

  return {
    historicalSimilarity:
      totalWeight > 0
        ? Math.round((historicalWeight / totalWeight) * 100)
        : 0,
    risk: count > 0 ? Math.round((riskSum / count) * 10) : 0,
    independence: count > 0 ? Math.round((independenceSum / count) * 10) : 0,
    biggestDivergence,
  }
}

export function getChoiceData(
  event: GameEvent,
  choice: 'yes' | 'no'
) {
  return choice === 'yes' ? event.yes : event.no
}
