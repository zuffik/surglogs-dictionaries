import React from 'react'
import { ListItem, ListItemText } from '@material-ui/core'
import { Dictionary } from '../../types/Dictionary'
import { Link } from 'react-router-dom'

interface Props {
    dictionary: Dictionary
}

export const DictionaryListItem: React.FC<Props> = (
  props: Props
): React.ReactElement => {
  return (
    <ListItem button component={Link} to={`/dictionary/${props.dictionary.id}`}>
      <ListItemText
        primary={props.dictionary.label}
        secondary={`Phrases: ${props.dictionary.phrases.length}`}
      />
    </ListItem>
  )
}
