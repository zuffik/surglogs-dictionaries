import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Add from '@material-ui/icons/Add'
import { Dictionary } from '../../types/Dictionary'
import { useHistory, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../../redux/State'
import * as _ from 'lodash'
import { actions } from '../../redux/Actions'
import { Box, Breadcrumbs, Button, Grid, TextField, Typography, Link } from '@material-ui/core'
import { Language } from '../../types/Language'
import { DictionaryLanguageSelect } from './DictionaryLanguageSelect'
import { Resource } from '../../types/api/Resource'
import { Phrase } from '../../types/Phrase'
import { PhraseFormRedux } from '../phrase/PhraseForm'
import { Link as RouterLink } from 'react-router-dom'

interface Props {
    onSubmit: (dictionary: Dictionary) => void;
    dictionary: Dictionary;
    languages: Resource<Language[]>;
}

const useStyles = makeStyles(() => ({
  textField: {
    width: '100%',
    minWidth: 200
  }
}))

export const DictionaryForm: React.FC<Props> = (props: Props): React.ReactElement => {
  const styles = useStyles(props)
  const [phrases, setPhrases] = useState(props.dictionary.phrases)
  const setPhraseField = (i: number, key: keyof Phrase) => (value: string) => setPhrases(_.set(_.clone(phrases), [i, key], value))
  const onRemoveRow = (index: number) => () => setPhrases(_.clone(phrases).filter((p, i) => index !== i))
  const addPhrase = (id: number) => () => setPhrases([...phrases, {
    id: id.toString(),
    translated: '',
    original: ''
  }])
  const [label, setLabel] = useState(props.dictionary.label)
  const [originLanguage, setOriginLanguage] = useState(props.dictionary.originLanguage)
  const [targetLanguage, setTargetLanguage] = useState(props.dictionary.targetLanguage)

  const onSubmit = () => props.onSubmit({
    id: props.dictionary.id,
    phrases,
    originLanguage,
    targetLanguage,
    label
  })
  return (
    <>
      <Box mb={2}>
        <Breadcrumbs>
          <Link component={RouterLink} to='/'>Home</Link>
          <Typography>{props.dictionary.id === '' ? 'Create dictionary' : 'Edit dictionary'}</Typography>
        </Breadcrumbs>
      </Box>
      <Grid container spacing={2}>
        <Grid item>
          <TextField label='Label'
            value={label}
            data-testid='dictionary-form-label'
            onChange={e => setLabel(e.target.value)}
            classes={{ root: styles.textField }} />
        </Grid>
        <Grid item>
          <DictionaryLanguageSelect onChange={setOriginLanguage}
            value={originLanguage}
            classes={{ root: styles.textField }}
            languages={props.languages}
            data-testid='dictionary-form-origin-language'
            menuId='dictionary-form-origin-language-menu'
            label='Origin language' />
        </Grid>
        <Grid item>
          <DictionaryLanguageSelect onChange={setTargetLanguage}
            value={targetLanguage}
            classes={{ root: styles.textField }}
            languages={props.languages}
            data-testid='dictionary-form-target-language'
            menuId='dictionary-form-target-language-menu'
            label='Target language' />
        </Grid>
        <Grid item xs={12}>
          {phrases.map((phrase, i) => (
            <PhraseFormRedux key={phrase.id}
              originLanguage={originLanguage}
              targetLanguage={targetLanguage}
              phraseId={phrase.id}
              onOriginalTextChange={setPhraseField(i, 'original')}
              onTranslatedTextChange={setPhraseField(i, 'translated')}
              originalText={phrase.original}
              onRemove={onRemoveRow(i)}
              translatedText={phrase.translated} />
          ))}
        </Grid>
        <Grid item xs={12}>
          <Box display='flex' flexDirection='column'>
            <Box my={2}>
              <Button variant='outlined' color='primary' size='small' onClick={addPhrase(phrases.length)} data-testid='dictionary-form-add-phrase'>
                <Add />
                            Add phrase
              </Button>
            </Box>
            <Button variant='contained' color='primary' onClick={onSubmit} data-testid='dictionary-form-submit'>
                        Save
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

interface ReduxInputProps extends Partial<Props> {
}

export const DictionaryFormRedux: React.FC<ReduxInputProps> = (props: ReduxInputProps): React.ReactElement => {
  const dispatch = useDispatch()
  const params = useParams<{ id: string }>()
  const history = useHistory()
  const possibleLanguages = useSelector((state: State) => state.possibleLanguages)

  useEffect(() => {
    if (!possibleLanguages.hasData && !possibleLanguages.loading) {
      dispatch(actions.fetchLanguages.request({}))
    }
    dispatch(actions.setDictionaryForForm(params))
    return () => {
      dispatch(actions.setDictionaryForForm(undefined))
    }
  }, [dispatch, params, possibleLanguages])

  const dictionary = useSelector((state: State) => state.formDictionary)
  const onSubmit = (dictionary: Dictionary) => {
    dispatch(dictionary.id === '' ? actions.createDictionary(dictionary) : actions.updateDictionary(dictionary))
    history.goBack()
  }
  if (!dictionary) return <></>
  return (
    <DictionaryForm {...props} dictionary={dictionary} onSubmit={onSubmit} languages={possibleLanguages} />
  )
}
