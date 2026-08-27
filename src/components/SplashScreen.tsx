import { useState } from 'react'
import { useLanguage } from '../i18n/useLanguage'
import type { Language } from '../i18n/ui'

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
      <div className="splash-top">
        <h1 className="splash-title">{t('splashTitle')}</h1>
        <p className="splash-subtitle">{t('splashSubtitle')}</p>
        <p className="splash-tagline">{t('splashTagline')}</p>
      </div>
      <div className="splash-bottom">
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
