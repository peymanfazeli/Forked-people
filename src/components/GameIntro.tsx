import type { Character } from '../types'
import { useLanguage } from '../i18n/useLanguage'

interface Props {
  character: Character
  onStart: () => void
}

export default function GameIntro({ character, onStart }: Props) {
  const { t } = useLanguage()
  return (
    <div className="screen intro-screen">
      <div className="intro-content glass">
        <p className="intro-label">{t('yourJourneyBegins')}</p>
        <p className="intro-description">{character.description}</p>
        <p className="intro-hint">
          {t('hintPrefix')} <em>{t('you')}</em> {t('hintSuffix')}
        </p>
        <button className="btn btn-primary" onClick={onStart}>
          {t('begin')}
        </button>
      </div>
    </div>
  )
}
