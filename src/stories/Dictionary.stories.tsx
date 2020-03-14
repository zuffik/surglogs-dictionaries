import React from 'react'
import { DictionaryList } from '../components/dictionary/DictionaryList'
import * as _ from 'lodash'
import { dictionary } from '../services/mock/DictionaryMock'
import { number } from '@storybook/addon-knobs'
import { DictionaryForm } from '../components/dictionary/DictionaryForm'
import { action } from '@storybook/addon-actions'
import { languages } from '../services/mock/LanguageMock'
import { Language } from '../types/Language'
import { Resource } from '../types/api/Resource'

export default {
  title: 'Dictionary'
}

export const list = () => (
  <DictionaryList
    onDeleteItem={action('onDeleteItem')}
    dictionaries={_.times(
      number('No. of dictionaries', 3, {
        min: 0,
        max: 10,
        range: true
      }),
      dictionary
    )}
  />
)

export const form = () => (
  <DictionaryForm
    onSubmit={action('onSubmit')}
    dictionary={dictionary()}
    languages={new Resource<Language[]>(languages)}
  />
)
