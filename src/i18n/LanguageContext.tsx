import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ui, type Language } from './ui'
import { LanguageContext } from './context'
import type { LanguageContextValue, TranslationKey } from './context'

const STORAGE_KEY = 'life-decisions-language'

function readStoredLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'fa' ? 'fa' : 'en'
}

function translate(
  dict: typeof ui.en,
  key: TranslationKey,
  params?: Record<string, string | number>
): string {
  let text = dict[key]
  if (params) {
    for (const [name, value] of Object.entries(params)) {
      text = text.replace(`{${name}}`, String(value))
    }
  }
  return text
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(readStoredLanguage)

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr'
    localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      isRtl: lang === 'fa',
      t: (key, params) => translate(ui[lang], key, params),
    }),
    [lang]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
