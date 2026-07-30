export interface Choice {
  consequence: string
  historicalConsequence?: string
  historical: boolean
  risk: number
  independence: number
  nextEvent: number | null
}

export interface GameEvent {
  id: number
  year: number
  chapter: string
  title: string
  playerFact: string
  historicalFact: string
  question: string
  weight: number
  yes: Choice
  no: Choice
}

export interface Character {
  id: string
  name: string
  birthYear: number
  deathYear?: number
  description: string
  scoring: {
    historicalSimilarity: string
    risk: string
    independence: string
    scoreRange: { min: number; max: number }
  }
  ending: {
    title: string
    revealName: boolean
  }
  events: GameEvent[]
}

export type GamePhase =
  | 'splash'
  | 'intro'
  | 'question'
  | 'consequence'
  | 'reveal'
  | 'result'

export interface CompletedEvent {
  eventId: number
  choice: 'yes' | 'no'
}

export interface GameState {
  phase: GamePhase
  characterId: string | null
  currentEventId: number | null
  completedEvents: CompletedEvent[]
  selectedChoice: 'yes' | 'no' | null
  isLocked: boolean
}

export type GameAction =
  | { type: 'SELECT_CHARACTER'; characterId: string }
  | { type: 'START_GAME' }
  | { type: 'MAKE_CHOICE'; choice: 'yes' | 'no' }
  | { type: 'NEXT_EVENT'; nextEventId: number | null }
  | { type: 'SHOW_RESULTS' }
  | { type: 'PLAY_AGAIN' }
  | { type: 'BACK_TO_SELECT' }

export interface ScoreResult {
  historicalSimilarity: number
  risk: number
  independence: number
  biggestDivergence: {
    event: GameEvent
    playerChoice: 'yes' | 'no'
    historicalChoice: 'yes' | 'no'
  } | null
}
