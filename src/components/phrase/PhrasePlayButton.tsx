import * as React from 'react'
import SpeakerIcon from '@material-ui/icons/RecordVoiceOver'
import { IconButton, InputAdornment } from '@material-ui/core'

interface Props {
  onClick: () => void
}

export const PhrasePlayButton: React.FC<Props> = (
  props: Props
): React.ReactElement => {
  return (
    <InputAdornment position='end'>
      <IconButton onClick={props.onClick}>
        <SpeakerIcon fontSize='small' />
      </IconButton>
    </InputAdornment>
  )
}
