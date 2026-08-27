import { useReducer, useCallback, useEffect, useState } from 'react'
import { getCharacter, getRandomCharacter } from './data/characters'
import { initialGameState, gameReducer } from './engine/gameState'
import { LanguageProvider } from './i18n/LanguageContext'
import { useLanguage } from './i18n/useLanguage'
import { audio } from './engine/audio'
import RiveBackground from './components/RiveBackground'
import LoadingScreen from './components/LoadingScreen'
import SplashScreen from './components/SplashScreen'
import GameIntro from './components/GameIntro'
import GameView from './components/GameView'
import IdentityReveal from './components/IdentityReveal'
import ResultsView from './components/ResultsView'
import SettingsMenu from './components/SettingsMenu'
import './styles/game.css'

const RIVE_URLS = ['/earth.riv', '/rotate.riv']
const AUDIO_URLS = ['/click.mp3']
const MAX_LOAD_MS = 5000

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
  const [loadProgress, setLoadProgress] = useState(0)
  const [riveUrls, setRiveUrls] = useState<Record<string, string>>({})

  useEffect(() => {
    let cancelled = false

    async function preload() {
      const total = RIVE_URLS.length + AUDIO_URLS.length + 1
      let loaded = 0

      const bump = () => {
        loaded++
        if (!cancelled) setLoadProgress(Math.min(loaded / total, 1))
      }

      const safetyNet = setTimeout(() => {
        if (!cancelled) setLoadProgress(1)
      }, MAX_LOAD_MS)

      const rivePromises = RIVE_URLS.map(async url => {
        try {
          const r = await fetch(url)
          const buf = await r.arrayBuffer()
          const blobUrl = URL.createObjectURL(new Blob([buf]))
          if (!cancelled) setRiveUrls(prev => ({ ...prev, [url]: blobUrl }))
        } catch {}
        bump()
      })

      const audioPromises = AUDIO_URLS.map(url => {
        return new Promise<void>(resolve => {
          const el = new Audio(url)
          el.preload = 'auto'
          let done = false
          const finish = () => {
            if (done) return
            done = true
            clearTimeout(timer)
            bump()
            resolve()
          }
          el.oncanplaythrough = finish
          el.onerror = finish
          const timer = setTimeout(finish, 3000)
        })
      })

      const fontPromise = document.fonts.ready.then(() => { bump() })

      await Promise.all([...rivePromises, ...audioPromises, fontPromise])
      clearTimeout(safetyNet)
    }

    preload()

    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    return () => {
      Object.values(riveUrls).forEach(URL.revokeObjectURL)
    }
  }, [riveUrls])

  useEffect(() => {
    audio.load('click', '/click.mp3')
    audio.startBackground()
    const handlePress = (e: PointerEvent) => {
      if (e.target instanceof Element && e.target.closest('button')) {
        audio.play('click')
      }
    }
    document.addEventListener('pointerdown', handlePress)
    return () => document.removeEventListener('pointerdown', handlePress)
  }, [])

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

  const isLoading = state.phase === 'loading'
  const isPreSplash = isLoading || state.phase === 'splash'

  return (
    <>
      {isPreSplash && (
        <div className="rift-scene" aria-hidden="true">
          <RiveBackground key="earth" src={riveUrls['/earth.riv'] || '/earth.riv'} />
          <div className="rift-past" />
          <div className="rift-present" />
          <div className="rift-grain" />
          <div className="rift-dust">
            <span className="dust dust-1" />
            <span className="dust dust-2" />
            <span className="dust dust-3" />
            <span className="dust dust-4" />
            <span className="dust dust-5" />
            <span className="dust dust-6" />
            <span className="dust dust-7" />
            <span className="dust dust-8" />
          </div>
          <div className="rift-seam">
            <div className="rift-vessel" />
          </div>
          <div className="rift-vignette" />
        </div>
      )}
      {!isPreSplash && (
        <>
          <RiveBackground key="rotate" src={riveUrls['/rotate.riv'] || '/rotate.riv'} rotation={90} cover />
          <div className="bg-overlay" />
        </>
      )}
      <div className="app-layer">
        {isLoading && (
          <LoadingScreen
            progress={loadProgress}
            onComplete={() => dispatch({ type: 'LOADING_COMPLETE' })}
          />
        )}

        {state.phase === 'splash' && <SplashScreen onBegin={handleBegin} />}

        {state.phase === 'intro' && (
          <GameIntro character={character!} onStart={() => dispatch({ type: 'START_GAME' })} />
        )}

        {(state.phase === 'question' || state.phase === 'consequence') && (
          <GameView
            character={character!}
            event={currentEvent!}
            completedCount={state.completedEvents.length}
            selectedChoice={state.selectedChoice}
            isLocked={state.isLocked}
            onChoice={handleChoice}
            onContinue={handleContinue}
          />
        )}

        {state.phase === 'reveal' && (
          <IdentityReveal character={character!} onComplete={() => dispatch({ type: 'SHOW_RESULTS' })} />
        )}

        {state.phase === 'result' && (
          <ResultsView
            character={character!}
            completedEvents={state.completedEvents}
            onReplay={() => dispatch({ type: 'PLAY_AGAIN' })}
            onBackToSelect={handleAnotherLife}
          />
        )}
      </div>
      <SettingsMenu />
    </>
  )
}
