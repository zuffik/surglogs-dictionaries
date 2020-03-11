import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { LoginForm } from '../login/LoginForm'

interface Props {}

export const RouterLayout: React.FC<Props> = (
  props: Props
): React.ReactElement => {
  return (
    <Switch>
      <Route exact path='/login'>
        <LoginForm />
      </Route>
      <Redirect to='/login' />
    </Switch>
  )
}
