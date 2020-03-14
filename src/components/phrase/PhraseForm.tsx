import React, { useCallback, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress, Grid, IconButton, TextField } from '@material-ui/core'
import Delete from '@material-ui/icons/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../redux/Actions'
import { PhrasePlayButton } from './PhrasePlayButton'
import { Resource } from '../../types/api/Resource'
import { State } from '../../redux/State'
import { Autocomplete } from '@material-ui/lab'
import { Language } from '../../types/Language'

interface Props {
    originalText: string
    onOriginalTextChange: (value: string) => void

    translatedText: string
    onTranslatedTextChange: (value: string) => void

    onPlayTextClick: (source: 'original' | 'translated', text: string) => void

    hints?: Resource<string[]>
    phraseId: string

    onRemove: () => void
}

const useStyles = makeStyles(() => ({
  field: {
    width: '100%'
  }
}))

export const PhraseForm: React.FC<Props> = (
  props: Props
): React.ReactElement => {
  const styles = useStyles(props)
  const hints = props.hints?.data || []
  return (
    <Grid container spacing={1} data-testid='phrase-form-container'>
      <Grid item xs={5}>
        <TextField
          label='Original text'
          data-testid='phrase-form-original-text'
          onChange={e => props.onOriginalTextChange(e.target.value)}
          value={props.originalText}
          size='small'
          InputProps={{
            endAdornment: (
              <PhrasePlayButton
                onClick={() =>
                  props.onPlayTextClick('original', props.originalText)
                }
              />
            )
          }}
          classes={{ root: styles.field }}
        />
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          options={hints}
          freeSolo
          getOptionLabel={hint => hint}
          onChange={(e: any, value: string | null) => props.onTranslatedTextChange(value || '')}
          value={props.translatedText}
          disableClearable
          id='phrase-form-translated-text-hints'
          renderInput={params => (
            <TextField
              {...params}
              label='Translated text'
              size='small'
              data-testid='phrase-form-translated-text'
              onChange={e => props.onTranslatedTextChange(e.target.value)}
              InputProps={{
                ...params.InputProps,
                endAdornment: props.hints?.loading ? (
                  <CircularProgress size={20} data-testid='phrase-form-translate-loader' />
                ) : (
                  <PhrasePlayButton
                    onClick={() =>
                      props.onPlayTextClick('translated', props.translatedText)
                    }
                  />
                )
              }}
              classes={{ root: styles.field }}
            />
          )}
        />
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={props.onRemove} data-testid='phrase-form-delete-button'>
          <Delete />
        </IconButton>
      </Grid>
    </Grid>
  )
}

interface ReduxInputProps extends Partial<Props> {
    phraseId: string
    originLanguage: Language
    targetLanguage: Language
}

export const PhraseFormRedux: React.FC<ReduxInputProps> = (
  props: ReduxInputProps
): React.ReactElement => {
  const dispatch = useDispatch()
  const hintResource = useSelector(
    (state: State) => state.translations[props.phraseId]
  )
  const [timeout, setTimeoutForTyping] = useState<NodeJS.Timeout | undefined>(undefined)

  const onOriginalTextChange = (text: string) => {
    if (timeout) clearTimeout(timeout)
    setTimeoutForTyping(setTimeout(() => dispatch(
      actions.fetchTranslations.request({
        text,
        originLanguage: props.originLanguage,
        targetLanguage: props.targetLanguage,
        phraseId: props.phraseId
      })
    ), 500))
    if (props.onOriginalTextChange) {
      props.onOriginalTextChange(text)
    }
  }
  const onPlayTextClick = (source: 'original' | 'translated', text: string) =>
    dispatch(
      actions.textToSpeech.request({
        language:
        source === 'translated'
          ? props.targetLanguage
          : props.originLanguage,
        text
      })
    )
  const hints = hintResource?.data || []
  const onTranslatedTextChange = useCallback(props.onTranslatedTextChange!.bind(undefined, hints[0]), [hints])
  useEffect(() => {
    if (hints.length > 0) {
      onTranslatedTextChange()
    }
  }, [hints, onTranslatedTextChange])
  return (
    <PhraseForm
      {...(props as Props)}
      onOriginalTextChange={onOriginalTextChange}
      onPlayTextClick={onPlayTextClick}
      hints={hintResource}
    />
  )
}
