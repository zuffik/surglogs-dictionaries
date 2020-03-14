import * as React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { ListItem, ListItemText, Typography } from '@material-ui/core'
import { Dictionary } from '../../types/Dictionary'
import { Link } from 'react-router-dom'

interface Props {
  dictionary: Dictionary
}

const useStyles = makeStyles((theme: Theme) => ({}))

export const DictionaryListItem: React.FC<Props> = (
  props: Props
): React.ReactElement => {
  const styles = useStyles(props)
  return (
    <ListItem button component={Link} to={`/dictionary/${props.dictionary.id}`}>
      <ListItemText
        primary={props.dictionary.label}
        secondary={`Phrases: ${props.dictionary.phrases.length}`}
      />
    </ListItem>
  )
}
