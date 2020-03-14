import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { LoginFormRedux } from '../login/LoginForm'
import { AuthRouteRedux } from './AuthRoute'
import { DictionaryListRedux } from '../dictionary/DictionaryList'
import { Box } from '@material-ui/core'
import { DictionaryFormRedux } from '../dictionary/DictionaryForm'
import { LogoutButtonRedux } from '../login/LogoutButton'

interface Props {
}

export const RouterLayout: React.FC<Props> = (): React.ReactElement => {
  return (
    <Box p={3}>
      <Switch>
        <Route exact path='/login'>
          <LoginFormRedux />
        </Route>
        <AuthRouteRedux exact path='/'>
          <DictionaryListRedux />
        </AuthRouteRedux>
        <AuthRouteRedux exact path='/dictionary/:id'>
          <DictionaryFormRedux />
        </AuthRouteRedux>
        <Redirect to='/login' />
      </Switch>
      <LogoutButtonRedux />
    </Box>
  )
}
