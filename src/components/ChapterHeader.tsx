import { useLanguage } from '../i18n/useLanguage'

interface Props {
  chapter: string
}

export default function ChapterHeader({ chapter }: Props) {
  const { t } = useLanguage()
  return (
    <div className="chapter-header">
      <span className="chapter-label">{t('chapter')}</span>
      <span className="chapter-name">{chapter}</span>
    </div>
  )
}
