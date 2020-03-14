import React from 'react'
import { TextFieldProps } from '@material-ui/core/TextField'
import { LinearProgress, MenuItem, TextField } from '@material-ui/core'
import * as _ from 'lodash'
import { Language } from '../../types/Language'
import { Resource } from '../../types/api/Resource'

interface Props {
  onChange: (lang: Language) => void
  value: Language
  languages: Resource<Language[]>
  label: string
  classes?: TextFieldProps['classes']
}

export const DictionaryLanguageSelect: React.FC<Props> = (
  props: Props
): React.ReactElement => {
  if (!props.languages.loading) {
    return <LinearProgress />
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
