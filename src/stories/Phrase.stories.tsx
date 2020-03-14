import React from 'react'
import { action } from '@storybook/addon-actions'
import { PhraseForm } from '../components/phrase/PhraseForm'
import { Resource } from '../types/api/Resource'

export default {
  title: 'Phrase'
}

export const form = () => (
  <PhraseForm
    originalText='Original'
    onRemove={action('onRemove')}
    onPlayTextClick={action('onPlayTextClick')}
    onOriginalTextChange={action('onOriginalTextChange')}
    translatedText='Translated'
    onTranslatedTextChange={action('onTranslatedTextChange')}
    hints={
      new Resource<string[]>([
        'Alternative 1',
        'Alternative 2',
        'Alternative 3'
      ])
    }
    phraseId='0'
  />
)
