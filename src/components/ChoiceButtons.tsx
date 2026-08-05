import { useLanguage } from '../i18n/useLanguage'

interface Props {
  onChoice: (choice: 'yes' | 'no') => void
  disabled: boolean
}

export default function ChoiceButtons({ onChoice, disabled }: Props) {
  const { t } = useLanguage()
  return (
    <div className="choice-buttons">
      <button
        className="btn btn-choice btn-yes"
        onClick={() => onChoice('yes')}
        disabled={disabled}
      >
        {t('yes')}
      </button>
      <button
        className="btn btn-choice btn-no"
        onClick={() => onChoice('no')}
        disabled={disabled}
      >
        {t('no')}
      </button>
    </div>
  )
}
