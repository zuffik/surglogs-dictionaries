import * as React from 'react'
import { User } from '../../types/User'
import { useSelector } from 'react-redux'
import { State } from '../../redux/State'
import { Redirect, Route, RouteProps } from 'react-router'

interface Props extends RouteProps {
  user?: User
}

export const AuthRoute: React.FC<Props> = (
  props: Props
): React.ReactElement => {
  const { user, ...routeProps } = props
  if (!user) {
    return <Redirect to='/login' />
  }
  return <Route {...routeProps} />
}

interface ReduxInputProps extends Partial<Props> {}

export const AuthRouteRedux: React.FC<Props> = (
  props: ReduxInputProps
): React.ReactElement => {
  const user: User | undefined = useSelector((state: State) => state.user)
  return <AuthRoute {...props} user={user} />
}
