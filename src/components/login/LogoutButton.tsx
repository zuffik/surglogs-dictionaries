import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/Actions'

interface Props {
    onClick: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    right: theme.spacing(3),
    bottom: theme.spacing(3)
  }
}))

export const LogoutButton: React.FC<Props> = (props: Props): React.ReactElement => {
  const styles = useStyles(props)
  return (
    <Button variant='outlined' size='small' color='secondary' classes={{ root: styles.root }} onClick={props.onClick}>
            Logout
    </Button>
  )
}

interface ReduxInputProps extends Partial<Props> {
}

export const LogoutButtonRedux: React.FC<ReduxInputProps> = (props: ReduxInputProps): React.ReactElement => {
  const dispatch = useDispatch()
  return (
    <LogoutButton {...props} onClick={() => dispatch(actions.logout())} />
  )
}
