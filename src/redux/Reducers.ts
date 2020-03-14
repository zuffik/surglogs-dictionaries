import { Reducers } from './helpers/Reducer'
import { actions } from './Actions'
import { State } from './State'
import { Action } from 'typescript-fsa'
import { User } from '../types/User'
import { database } from '../services/Database'
import * as _ from 'lodash'
import { FetchTranslationsRequestPayload, FetchTranslationsResponsePayload } from '../types/dto/FetchTranslationsPayload'
import { Resource } from '../types/api/Resource'
import { AsyncActionResponse } from '../services/AsyncActionCreator'
import { Language } from '../types/Language'
import { TextToSpeechRequestPayload, TextToSpeechResponsePayload } from '../types/dto/TextToSpeechPayload'
import { Dictionary } from '../types/Dictionary'
import chance from 'chance'

export const reducers: Reducers<State, any> = {
  [actions.login.type]: (state: State, action: Action<User>) => {
    state.user = action.payload
    state.dictionaries = database.getItem<{[K: string]: Dictionary[]}>('dictionaries', {})[state.user!.email] || []
    database.setItem('user', state.user)
    return state
  },
  [actions.logout.type]: () => {
    database.removeItem('user')
    return new State()
  },
  [actions.createDictionary.type]: (state: State, action: Action<Dictionary>) => {
    state.dictionaries = [
      ...state.dictionaries,
      {
        ...action.payload,
        id: chance().guid(),
        phrases: action.payload.phrases.map(phrase => ({
          ...phrase,
          id: chance().guid()
        }))
      }
    ]
    database.setItem('dictionaries', {
      ...database.getItem('dictionaries'),
      [state.user!.email]: state.dictionaries
    })
    return state
  },
  [actions.updateDictionary.type]: (state: State, action: Action<Dictionary>) => {
    const index = _.findIndex(state.dictionaries, dict => action.payload.id === dict.id)
    state.dictionaries = state.dictionaries.slice()
    state.dictionaries[index] = action.payload
    database.setItem('dictionaries', {
      ...database.getItem('dictionaries'),
      [state.user!.email]: state.dictionaries
    })
    return state
  },
  [actions.deleteDictionary.type]: (state: State, action: Action<Dictionary>) => {
    state.dictionaries = state.dictionaries.slice().filter(item => item.id !== action.payload.id)
    database.setItem('dictionaries', {
      ...database.getItem('dictionaries'),
      [state.user!.email]: state.dictionaries
    })
    return state
  },
  [actions.setDictionaryForForm.type]: (
    state: State,
    action: Action<{ id: string } | undefined>
  ) => {
    state.formDictionary = action.payload
      ? _.find(
        state.dictionaries,
        i => i.id.toString() === action.payload!.id
      ) || {
        id: '',
        phrases: [],
        label: '',
        originLanguage: state.defaultOriginLanguage,
        targetLanguage: state.defaultTargetLanguage
      }
      : undefined
    if (!state.formDictionary) {
      state.translations = {}
    }
    return state
  },
  [actions.fetchTranslations.request.type]: (
    state: State,
    action: Action<FetchTranslationsRequestPayload>
  ) => {
    if (!state.translations[action.payload.phraseId]) {
      state.translations = {
        ...state.translations,
        [action.payload.phraseId]: new Resource<string[]>()
      }
    }
    state.translations[action.payload.phraseId].start()
    return state
  },
  [actions.fetchTranslations.response.type]: (
    state: State,
    action: Action<AsyncActionResponse<FetchTranslationsRequestPayload,
            FetchTranslationsResponsePayload>>
  ) => {
    state.translations[action.payload.request.phraseId] = _.clone(state.translations[action.payload.request.phraseId])
    state.translations[action.payload.request.phraseId].finish(
      action.payload.response.translations
    )
    return state
  },
  [actions.fetchLanguages.request.type]: (state: State) => {
    state.possibleLanguages = _.clone(state.possibleLanguages)
    state.possibleLanguages.start()
    return state
  },
  [actions.fetchLanguages.response.type]: (state: State, action: Action<AsyncActionResponse<{}, Language[]>>) => {
    state.possibleLanguages = _.clone(state.possibleLanguages)
    state.possibleLanguages.finish(action.payload.response)
    return state
  },
  [actions.textToSpeech.response.type]: (state: State, action: Action<AsyncActionResponse<TextToSpeechRequestPayload, TextToSpeechResponsePayload>>) => {
    const audio = new Audio(action.payload.response.audio)
    audio.play()
    return state
  }
}
