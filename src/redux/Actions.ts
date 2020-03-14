import { actionCreatorFactory } from 'typescript-fsa'
import { User } from '../types/User'
import { Dictionary } from '../types/Dictionary'
import { asyncActionCreator } from '../services/AsyncActionCreator'
import {
  FetchTranslationsRequestPayload,
  FetchTranslationsResponsePayload
} from '../types/dto/FetchTranslationsPayload'
import {
  TextToSpeechRequestPayload,
  TextToSpeechResponsePayload
} from '../types/dto/TextToSpeechPayload'

const actionCreator = actionCreatorFactory()

export const actions = {
  login: actionCreator<User>('login'),
  setDictionaryForForm: actionCreator<{ id: string } | undefined>(
    'setDictionaryForForm'
  ),
  createDictionary: actionCreator<Dictionary>('createDictionary'),
  updateDictionary: actionCreator<Dictionary>('updateDictionary'),

  fetchTranslations: asyncActionCreator<
    FetchTranslationsRequestPayload,
    FetchTranslationsResponsePayload
  >('fetchTranslations'),
  textToSpeech: asyncActionCreator<
    TextToSpeechRequestPayload,
    TextToSpeechResponsePayload
  >('textToSpeech')
}
