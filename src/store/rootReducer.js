import { combineReducers } from 'redux'
import authReducer, { AUTH_KEY } from './reducers/auth'
import eventsReducer, { EVENTS_KEY } from './reducers/events'

const makeRootReducer = () =>
  combineReducers({
    [AUTH_KEY]: authReducer,
    [EVENTS_KEY]: eventsReducer
  })

export default makeRootReducer
