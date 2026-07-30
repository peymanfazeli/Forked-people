import { useCallback } from 'react'
import type { Character, GameEvent } from '../types'
import { getChoiceData } from '../engine/scoring'
import { audio } from '../engine/audio'
import ProgressDots from './ProgressDots'
import ChapterHeader from './ChapterHeader'
import EventContext from './EventContext'
import QuestionBlock from './QuestionBlock'
import ChoiceButtons from './ChoiceButtons'
import ConsequenceBlock from './ConsequenceBlock'

interface Props {
  character: Character
  event: GameEvent
  completedCount: number
  selectedChoice: 'yes' | 'no' | null
  isLocked: boolean
  onChoice: (choice: 'yes' | 'no') => void
  onContinue: (nextEventId: number | null) => void
}

export default function GameView({
  character,
  event,
  completedCount,
  selectedChoice,
  isLocked,
  onChoice,
  onContinue,
}: Props) {
  const handleChoice = useCallback(
    (choice: 'yes' | 'no') => {
      audio.play('decision')
      onChoice(choice)
    },
    [onChoice]
  )

  const handleContinue = useCallback(() => {
    const choiceData = getChoiceData(event, selectedChoice!)
    audio.play('consequence')
    onContinue(choiceData.nextEvent)
  }, [event, selectedChoice, onContinue])

  const totalEvents = character.events.length
  const isConsequence = selectedChoice !== null

  return (
    <div className="screen game-screen">
      <div className="game-sections">
        <div className="glass game-section-progress">
          <ProgressDots total={totalEvents} completed={completedCount} />
        </div>

        <div className="glass game-section-life">
          <ChapterHeader chapter={event.chapter} />
          <EventContext year={event.year} playerFact={event.playerFact} />
        </div>

        <div className="glass game-section-question">
          <div className={`game-transition${isConsequence ? ' show-consequence' : ''}`}>
            {!isConsequence ? (
              <>
                <QuestionBlock question={event.question} />
                <ChoiceButtons onChoice={handleChoice} disabled={isLocked} />
              </>
            ) : (
              <ConsequenceBlock
                consequence={getChoiceData(event, selectedChoice).consequence}
                onContinue={handleContinue}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
