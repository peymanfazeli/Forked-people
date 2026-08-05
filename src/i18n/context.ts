import { createContext } from 'react'
import type { Language, UiDictionary } from './ui'

export type TranslationKey = keyof UiDictionary

export interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: TranslationKey, params?: Record<string, string | number>) => string
  isRtl: boolean
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
