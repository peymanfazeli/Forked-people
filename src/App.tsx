import { useReducer, useCallback } from 'react'
import { getCharacter, getRandomCharacter } from './data/characters'
import { initialGameState, gameReducer } from './engine/gameState'
import { LanguageProvider } from './i18n/LanguageContext'
import { useLanguage } from './i18n/useLanguage'
import RiveBackground from './components/RiveBackground'
import SplashScreen from './components/SplashScreen'
import GameIntro from './components/GameIntro'
import GameView from './components/GameView'
import IdentityReveal from './components/IdentityReveal'
import ResultsView from './components/ResultsView'
import './styles/game.css'

export default function App() {
  return (
    <LanguageProvider>
      <Game />
    </LanguageProvider>
  )
}

function Game() {
  const { lang } = useLanguage()
  const [state, dispatch] = useReducer(gameReducer, initialGameState)

  const character = state.characterId ? getCharacter(state.characterId, lang) ?? null : null
  const currentEvent =
    character && state.currentEventId
      ? character.events.find(e => e.id === state.currentEventId) ?? null
      : null

  const handleChoice = useCallback(
    (choice: 'yes' | 'no') => dispatch({ type: 'MAKE_CHOICE', choice }),
    []
  )

  const handleContinue = useCallback(
    (nextEventId: number | null) =>
      dispatch({ type: 'NEXT_EVENT', nextEventId }),
    []
  )

  const handleBegin = useCallback(() => {
    const picked = getRandomCharacter(undefined, lang)
    dispatch({ type: 'SELECT_CHARACTER', characterId: picked.id })
  }, [lang])

  const handleAnotherLife = useCallback(() => {
    const picked = getRandomCharacter(state.characterId ?? undefined, lang)
    dispatch({ type: 'SELECT_CHARACTER', characterId: picked.id })
  }, [state.characterId, lang])

  const isSplash = state.phase === 'splash'

  return (
    <>
      {isSplash ? (
        <RiveBackground key="earth" src="/earth.riv" />
      ) : (
        <>
          <RiveBackground key="rotate" src="/rotate.riv" rotation={90} cover />
          <div className="bg-overlay" />
        </>
      )}
      <div className="app-layer">
        {(() => {
          switch (state.phase) {
            case 'splash':
              return <SplashScreen onBegin={handleBegin} />

            case 'intro':
              return <GameIntro character={character!} onStart={() => dispatch({ type: 'START_GAME' })} />

            case 'question':
            case 'consequence':
              return (
                <GameView
                  character={character!}
                  event={currentEvent!}
                  completedCount={state.completedEvents.length}
                  selectedChoice={state.selectedChoice}
                  isLocked={state.isLocked}
                  onChoice={handleChoice}
                  onContinue={handleContinue}
                />
              )

            case 'reveal':
              return <IdentityReveal character={character!} onComplete={() => dispatch({ type: 'SHOW_RESULTS' })} />

            case 'result':
              return (
                <ResultsView
                  character={character!}
                  completedEvents={state.completedEvents}
                  onReplay={() => dispatch({ type: 'PLAY_AGAIN' })}
                  onBackToSelect={handleAnotherLife}
                />
              )

            default:
              return null
          }
        })()}
      </div>
    </>
  )
}
