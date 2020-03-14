import { put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { Action, isType } from 'typescript-fsa'
import { AsyncActionCreator } from '../../services/AsyncActionCreator'

export enum Take {
  Every,
  Latest
}

// any due to https://github.com/Microsoft/TypeScript/issues/2983#issuecomment-230404301
export function * watch<P, R, S extends object> (
  asyncAction: AsyncActionCreator<P, R>,
  call: (action: Action<P>, state: S) => Generator<any, any, any>,
  take: Take = Take.Latest
) {
  const f = function * (action: any) {
    if (isType(action, asyncAction.request)) {
      const state: S = yield select((state: S) => state)
      try {
        const response = yield call(action, state)
        yield put(asyncAction.response({
          request: action.payload,
          response
        }))
      } catch (e) {
        console.error('Error with action', action.type, e)
        yield put(
          asyncAction.response({
            request: action.payload,
            response: (undefined as unknown) as R
          })
        )
      }
    }
  }
  if (take === Take.Every) {
    yield takeEvery(asyncAction.request.type, f)
  } else if (take === Take.Latest) {
    yield takeLatest(asyncAction.request.type, f)
  }
}
