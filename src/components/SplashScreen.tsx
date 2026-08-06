import { useState } from 'react'
import { useLanguage } from '../i18n/useLanguage'
import type { Language } from '../i18n/ui'
import RiveBackground from './RiveBackground'

interface Props {
  onBegin: () => void
}

export default function SplashScreen({ onBegin }: Props) {
  const { lang, setLang, t } = useLanguage()
  const [jelly, setJelly] = useState('')

  const selectLanguage = (next: Language) => {
    if (next === lang) return
    setLang(next)
    setJelly('')
    requestAnimationFrame(() => setJelly(next === 'fa' ? 'rift-jelly-to-fa' : 'rift-jelly-to-en'))
  }

  return (
    <div className="screen splash-screen">
      <div className="rift-scene" aria-hidden="true">
        <RiveBackground key="earth" src="/earth.riv" />
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
      <div className="splash-content">
        <h1 className="splash-title">{t('splashTitle')}</h1>
        <p className="splash-subtitle">{t('splashSubtitle')}</p>
        <p className="splash-tagline">{t('splashTagline')}</p>
        <button className="btn btn-primary btn-splash" onClick={onBegin}>
          {t('beginYourJourney')}
        </button>
        <div
          className={`language-select${lang === 'fa' ? ' is-fa' : ''}${jelly ? ` ${jelly}` : ''}`}
          role="group"
          aria-label={t('language')}
        >
          <div className="language-thumb" aria-hidden="true" />
          <button
            type="button"
            className={`language-option${lang === 'en' ? ' active' : ''}`}
            onClick={() => selectLanguage('en')}
            aria-pressed={lang === 'en'}
          >
            {t('english')}
          </button>
          <button
            type="button"
            className={`language-option${lang === 'fa' ? ' active' : ''}`}
            onClick={() => selectLanguage('fa')}
            aria-pressed={lang === 'fa'}
          >
            {t('persian')}
          </button>
        </div>
      </div>
    </div>
  )
}
