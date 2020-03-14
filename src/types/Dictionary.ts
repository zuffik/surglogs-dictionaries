import { Phrase } from './Phrase'
import { Language } from './Language'

export interface Dictionary {
  id: string
  label: string
  originLanguage: Language
  targetLanguage: Language
  phrases: Phrase[]
}
