import { createStore } from 'redux'
import { reducer } from './helpers/Reducer'
import { reducers } from './Reducers'

export const store = createStore(reducer(reducers))
