import { Language } from '../Language'

export interface FetchTranslationsRequestPayload {
  phraseId: string
  text: string
  originLanguage: Language
  targetLanguage: Language
}
export interface FetchTranslationsResponsePayload {
  translations: string[]
}
