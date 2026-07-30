import type { GameState, GameAction } from '../types'

export const initialGameState: GameState = {
  phase: 'splash',
  characterId: null,
  currentEventId: null,
  completedEvents: [],
  selectedChoice: null,
  isLocked: false,
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SELECT_CHARACTER':
      return {
        ...state,
        phase: 'intro',
        characterId: action.characterId,
        currentEventId: 1,
        completedEvents: [],
        selectedChoice: null,
        isLocked: false,
      }

    case 'START_GAME':
      return {
        ...state,
        phase: 'question',
        isLocked: false,
      }

    case 'MAKE_CHOICE':
      return {
        ...state,
        selectedChoice: action.choice,
        completedEvents: [
          ...state.completedEvents,
          { eventId: state.currentEventId!, choice: action.choice },
        ],
        isLocked: true,
        phase: 'consequence',
      }

    case 'NEXT_EVENT':
      return {
        ...state,
        currentEventId: action.nextEventId,
        selectedChoice: null,
        isLocked: false,
        phase: action.nextEventId === null ? 'reveal' : 'question',
      }

    case 'SHOW_RESULTS':
      return {
        ...state,
        phase: 'result',
        isLocked: false,
      }

    case 'PLAY_AGAIN':
      return {
        ...state,
        phase: 'intro',
        currentEventId: 1,
        completedEvents: [],
        selectedChoice: null,
        isLocked: false,
      }

    case 'BACK_TO_SELECT':
      return {
        ...state,
        phase: 'splash',
        characterId: null,
        currentEventId: null,
        completedEvents: [],
        selectedChoice: null,
        isLocked: false,
      }

    default:
      return state
  }
}
