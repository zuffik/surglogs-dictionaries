import { Dictionary } from '../../types/Dictionary'
import chance from 'chance'
import { languages } from './LanguageMock'

export const dictionary = (): Dictionary => ({
  id: chance().guid(),
  targetLanguage: chance().pickone(languages),
  originLanguage: chance().pickone(languages),
  label: chance().sentence({ words: 3 }),
  phrases: []
})
