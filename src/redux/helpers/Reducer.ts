import { State } from '../State'
import * as _ from 'lodash'
import { Reducer } from 'redux'
import { actions } from '../Actions'
import { isAsyncAction } from '../../services/AsyncActionCreator'
import { isType, ActionCreator } from 'typescript-fsa'

export type Reducers<S, A> = Partial<{
  [K: string]: (state: S, action: A) => S
}>

export const reducer = <S, A extends ActionCreator<any>>(
  reducers: Reducers<S, A>
): Reducer<S, A> => (state: S = new State() as S, action: A): S =>
  _.keys(actions).reduce((state, key) => {
    const a: ActionCreator<any> = actions[key as keyof typeof actions]
    if (!isAsyncAction(a) && isType(action, a) && reducers[a.type]) {
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
