import React, { useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  Avatar,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../redux/Actions'
import { State } from '../../redux/State'
import { Redirect } from 'react-router'

interface Props {
  onSubmit: (email: string, password: string) => void
}

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export const LoginForm: React.FC<Props> = (
  props: Props
): React.ReactElement => {
  const styles = useStyles(props)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <Container component='main' maxWidth='xs'>
      <div className={styles.paper}>
        <Avatar className={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email Address'
          name='email'
          autoComplete='email'
          autoFocus
          data-testid='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
          data-testid='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant='contained'
          color='primary'
          data-testid='submit'
          onClick={() => props.onSubmit(email, password)}
          className={styles.submit}
        >
          Sign In
        </Button>
      </div>
    </Container>
  )
}

interface ReduxInputProps extends Partial<Props> {}

export const LoginFormRedux: React.FC<ReduxInputProps> = (
  props: ReduxInputProps
): React.ReactElement => {
  const dispatch = useDispatch()
  const onSubmit = (email: string, password: string) =>
    dispatch(actions.login({ email, password }))
  const user = useSelector((state: State) => state.user)
  if (user) {
    return <Redirect to='/' />
  }
  return <LoginForm {...props} onSubmit={onSubmit} />
}
