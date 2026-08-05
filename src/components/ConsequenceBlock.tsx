import { useLanguage } from '../i18n/useLanguage'

interface Props {
  consequence: string
  onContinue: () => void
}

export default function ConsequenceBlock({ consequence, onContinue }: Props) {
  const { t } = useLanguage()
  return (
    <div className="consequence-block">
      <p className="consequence-text">{consequence}</p>
      <button className="btn btn-continue" onClick={onContinue}>
        {t('continue')}
      </button>
    </div>
  )
}
