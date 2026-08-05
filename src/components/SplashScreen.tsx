import { useLanguage } from '../i18n/useLanguage'
import type { Language } from '../i18n/ui'

interface Props {
  onBegin: () => void
}

export default function SplashScreen({ onBegin }: Props) {
  const { lang, setLang, t } = useLanguage()

  const selectLanguage = (next: Language) => setLang(next)

  return (
    <div className="screen splash-screen">
      <div className="splash-overlay" />
      <div className="splash-content">
        <h1 className="splash-title">{t('splashTitle')}</h1>
        <p className="splash-subtitle">{t('splashSubtitle')}</p>
        <button className="btn btn-primary btn-splash" onClick={onBegin}>
          {t('beginYourJourney')}
        </button>
        <div className="language-select" role="group" aria-label={t('language')}>
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
