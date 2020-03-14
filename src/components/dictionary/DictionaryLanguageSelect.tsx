import React from 'react'
import { TextFieldProps } from '@material-ui/core/TextField'
import { LinearProgress, MenuItem, TextField, Theme } from '@material-ui/core'
import * as _ from 'lodash'
import { Language } from '../../types/Language'
import { Resource } from '../../types/api/Resource'
import { makeStyles } from '@material-ui/core/styles'

interface Props {
    onChange: (lang: Language) => void
    value: Language
    languages: Resource<Language[]>
    label: string
    classes?: TextFieldProps['classes']
}

const useStyles = makeStyles((theme: Theme) => ({
  loader: {
    minWidth: 200,
    marginTop: theme.spacing(5.5)
  },
  root: {}
}))

export const DictionaryLanguageSelect: React.FC<Props> = (
  props: Props
): React.ReactElement => {
  const styles = useStyles(props)
  if (props.languages.loading) {
    return <LinearProgress classes={{ root: styles.loader }} />
  }
  return (
        <>
          <TextField
            label={props.label}
            select
            classes={props.classes}
            value={props.value.code}
            onChange={e =>
              props.onChange(
                        _.find(props.languages.data, l => l.code === e.target.value)!
              )
            }
          >
            {props.languages.data!.map(lang => (
              <MenuItem value={lang.code} key={lang.code}>
                {lang.label}
              </MenuItem>
            ))}
          </TextField>
        </>
  )
}
