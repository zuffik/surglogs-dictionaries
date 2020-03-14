import * as _ from 'lodash'
import { Reducer } from 'redux'
import { actions } from '../Actions'
import {
  AsyncActionCreator,
  isAsyncAction,
  isNotAsyncAction
} from '../../services/AsyncActionCreator'
import { ActionCreator, isType } from 'typescript-fsa'

export type Reducers<S, A> = Partial<{
  [K: string]: (state: S, action: A) => S
}>

export const reducer = <S, A extends ActionCreator<any>>(
  reducers: Reducers<S, A>,
  createState: () => S
): Reducer<S, A> => (state: S = createState(), action: A): S =>
  _.keys(actions).reduce((state, key) => {
    const a: ActionCreator<any> | AsyncActionCreator<any, any> =
      actions[key as keyof typeof actions]
    if (isNotAsyncAction(a) && isType(action, a) && reducers[a.type]) {
      state = reducers[action.type]!(state, action)
    } else if (isAsyncAction(a)) {
      if (isType(action, a.request) && reducers[a.request.type]) {
        state = reducers[a.request.type]!(state, action)
      } else if (isType(action, a.response) && reducers[a.response.type]) {
        state = reducers[a.response.type]!(state, action)
      }
    }
    return state
  }, _.clone(state))
