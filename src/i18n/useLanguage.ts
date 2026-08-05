import { useContext } from 'react'
import { LanguageContext } from './context'
import type { LanguageContextValue } from './context'

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}
