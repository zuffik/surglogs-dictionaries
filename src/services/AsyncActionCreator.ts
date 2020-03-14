import { ActionCreator, actionCreatorFactory, AnyAction } from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

export type AsyncActionResponse<P, R> = { response: R; request: P }

export interface AsyncActionCreator<P, R> {
  request: ActionCreator<P>
  response: ActionCreator<AsyncActionResponse<P, R>>
}

export const isAsyncAction = <P, R = undefined>(
  action: AsyncActionCreator<P, AsyncActionResponse<P, R>> | AnyAction
): action is AsyncActionCreator<P, AsyncActionResponse<P, R>> =>
  !!action && 'request' in action && 'response' in action
export const isNotAsyncAction = <P, R = undefined>(
  action: AsyncActionCreator<P, AsyncActionResponse<P, R>> | AnyAction
): action is ActionCreator<P> => !isAsyncAction(action)

export const asyncActionCreator = <P, R>(
  type: string
): AsyncActionCreator<P, R> => ({
  request: actionCreator<P>(`${type}Request`),
  response: actionCreator<AsyncActionResponse<P, R>>(`${type}Response`)
})
