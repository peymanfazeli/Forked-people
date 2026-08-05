export type Language = 'en' | 'fa'

export interface UiDictionary {
  splashTitle: string
  splashSubtitle: string
  beginYourJourney: string
  yourJourneyBegins: string
  hintPrefix: string
  you: string
  hintSuffix: string
  begin: string
  chapter: string
  yes: string
  no: string
  continue: string
  journeyComplete: string
  youWereLiving: string
  present: string
  seeYourResults: string
  youMadeDecisions: string
  historicalSimilarity: string
  riskTaking: string
  independence: string
  playAgain: string
  anotherLife: string
  biggestDivergence: string
  yourPath: string
  realHistory: string
  language: string
  english: string
  persian: string
}

export const ui: Record<Language, UiDictionary> = {
  en: {
    splashTitle: 'Life Decisions',
    splashSubtitle: 'Live another life. Make the choices that shape history.',
    beginYourJourney: 'Begin Your Journey',
    yourJourneyBegins: 'Your journey begins...',
    hintPrefix: 'At each moment, choose what',
    you: 'you',
    hintSuffix: 'would do.',
    begin: 'Begin',
    chapter: 'Chapter',
    yes: 'YES',
    no: 'NO',
    continue: 'Continue',
    journeyComplete: 'Your journey is complete.',
    youWereLiving: 'You were living the life of...',
    present: 'Present',
    seeYourResults: 'See Your Results',
    youMadeDecisions: 'You made {count} decisions.',
    historicalSimilarity: 'Historical Similarity',
    riskTaking: 'Risk Taking',
    independence: 'Independence',
    playAgain: 'Play Again',
    anotherLife: 'Another Life',
    biggestDivergence: 'Your Biggest Divergence',
    yourPath: 'Your path',
    realHistory: 'Real history',
    language: 'Language',
    english: 'English',
    persian: 'فارسی',
  },
  fa: {
    splashTitle: 'تصمیم‌های زندگی',
    splashSubtitle: 'یک زندگی دیگر را تجربه کن. انتخاب‌هایی که تاریخ را می‌سازند.',
    beginYourJourney: 'آغاز سفر',
    yourJourneyBegins: 'سفر تو آغاز می‌شود...',
    hintPrefix: 'در هر لحظه، انتخاب کن که',
    you: 'تو',
    hintSuffix: 'چه می‌کردی.',
    begin: 'شروع',
    chapter: 'فصل',
    yes: 'بله',
    no: 'نه',
    continue: 'ادامه',
    journeyComplete: 'سفر تو کامل شد.',
    youWereLiving: 'تو زندگیِ این شخص را تجربه می‌کردی...',
    present: 'امروز',
    seeYourResults: 'مشاهده نتایج',
    youMadeDecisions: 'تو {count} تصمیم گرفتی.',
    historicalSimilarity: 'شباهت تاریخی',
    riskTaking: 'ریسک‌پذیری',
    independence: 'استقلال',
    playAgain: 'بازی دوباره',
    anotherLife: 'یک زندگی دیگر',
    biggestDivergence: 'بزرگ‌ترین انحراف',
    yourPath: 'مسیر تو',
    realHistory: 'تاریخ واقعی',
    language: 'زبان',
    english: 'English',
    persian: 'فارسی',
  },
}
