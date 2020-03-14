import React from 'react'
import { IconButton, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core'
import { Dictionary } from '../../types/Dictionary'
import { Link } from 'react-router-dom'
import Delete from '@material-ui/icons/Delete'

interface Props {
    dictionary: Dictionary
    onDelete: () => void;
}

export const DictionaryListItem: React.FC<Props> = (
  props: Props
): React.ReactElement => {
  return (
    <ListItem button component={Link} to={`/dictionary/${props.dictionary.id}`} data-testid='dictionary-list-item'>
      <ListItemText
        primary={props.dictionary.label}
        secondary={`Phrases: ${props.dictionary.phrases.length}`}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={props.onDelete} data-testid='dictionary-list-item-delete-button'>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
