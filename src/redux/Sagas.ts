import { all } from 'redux-saga/effects'
import { watch } from './helpers/Watch'
import { actions } from './Actions'
import { AxiosResponse } from 'axios'
import { translate } from '../api/Translate'
import { Language } from '../types/Language'
import { tts } from '../api/TextToSpeech'

export function * saga () {
  yield all([
    watch(actions.fetchLanguages, function * () {
      const response: AxiosResponse<{ data: { languages: { language: string, name: string }[] } }> =
                yield translate.get('/languages', {
                  params: {
                    key: process.env.REACT_APP_GOOGLE_API_KEY,
                    target: 'en'
                  }
                })
      return response.data.data.languages.map((l): Language => ({
        label: l.name,
        code: l.language
      }))
    }),
    watch(actions.fetchTranslations, function * (action) {
      const response: AxiosResponse<{ data: { translations: { translatedText: string }[] } }> =
                yield translate.post('/', {}, {
                  params: {
                    q: action.payload.text,
                    target: action.payload.targetLanguage.code,
                    source: action.payload.originLanguage.code,
                    format: 'text',
                    key: process.env.REACT_APP_GOOGLE_API_KEY
                  }
                })
      return {
        translations: response.data.data.translations.map(t => t.translatedText)
      }
    }),
    watch(actions.textToSpeech, function * (action) {
      const response: AxiosResponse<{ audioContent: string }> = yield tts.post('/', {
        input: {
          text: action.payload.text
        },
        voice: {
          languageCode: action.payload.language.code
        },
        audioConfig: {
          audioEncoding: 'MP3'
        }
      }, {
        params: {
          key: process.env.REACT_APP_GOOGLE_API_KEY
        }
      })
      return {
        audio: 'data:audio/mp3;base64,' + response.data.audioContent
      }
    })
  ])
}
