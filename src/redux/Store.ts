import { applyMiddleware, createStore, Middleware } from 'redux'
import { reducer } from './helpers/Reducer'
import { reducers } from './Reducers'
import createSagaMiddleware from 'redux-saga'
import { saga } from './Sagas'
import { createLogger } from 'redux-logger'
import { State } from './State'

const sagaMiddleware = createSagaMiddleware()

const middlewares: Middleware<any, any, any>[] = [sagaMiddleware]
if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    collapsed: true
  })
  middlewares.push(logger)
}
export const store = createStore(
  reducer(reducers, () => new State()),
  applyMiddleware(...middlewares)
)
sagaMiddleware.run(saga)
