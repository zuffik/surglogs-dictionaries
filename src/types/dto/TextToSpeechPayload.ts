import { Language } from '../Language'

export interface TextToSpeechRequestPayload {
  language: Language
  text: string
}
export interface TextToSpeechResponsePayload {
  audio: string
}
