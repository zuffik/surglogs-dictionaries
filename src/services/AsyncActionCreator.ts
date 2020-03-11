import { ActionCreator, actionCreatorFactory, AnyAction } from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

export interface AsyncActionCreator<P, R> {
  request: ActionCreator<P>
  response: ActionCreator<R>
}

export const isAsyncAction = <P, R = undefined>(
  action: AsyncActionCreator<P, R> | AnyAction
): action is AsyncActionCreator<P, R> =>
  !!action && 'request' in action && 'response' in action

export const asyncActionCreator = <P, R>(
  type: string
): AsyncActionCreator<P, R> => ({
  request: actionCreator(`${type}Request`),
  response: actionCreator(`${type}Response`)
})
