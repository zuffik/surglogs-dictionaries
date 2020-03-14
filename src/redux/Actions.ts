import { actionCreatorFactory } from 'typescript-fsa'
import { User } from '../types/User'
import { Dictionary } from '../types/Dictionary'
import { asyncActionCreator } from '../services/AsyncActionCreator'
import { FetchTranslationsRequestPayload, FetchTranslationsResponsePayload } from '../types/dto/FetchTranslationsPayload'
import { TextToSpeechRequestPayload, TextToSpeechResponsePayload } from '../types/dto/TextToSpeechPayload'
import { Language } from '../types/Language'

const actionCreator = actionCreatorFactory()

export const actions = {
  login: actionCreator<User>('login'),
  logout: actionCreator('logout'),
  setDictionaryForForm: actionCreator<{ id: string } | undefined>(
    'setDictionaryForForm'
  ),
  createDictionary: actionCreator<Dictionary>('createDictionary'),
  updateDictionary: actionCreator<Dictionary>('updateDictionary'),
  deleteDictionary: actionCreator<Dictionary>('deleteDictionary'),

  fetchTranslations: asyncActionCreator<FetchTranslationsRequestPayload,
        FetchTranslationsResponsePayload>('fetchTranslations'),
  textToSpeech: asyncActionCreator<TextToSpeechRequestPayload,
        TextToSpeechResponsePayload>('textToSpeech'),
  fetchLanguages: asyncActionCreator<{},
        Language[]>('fetchLanguages')
}
