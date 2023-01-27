import { combineReducers } from 'redux'
import authReducer, { AUTH_KEY } from './reducers/auth'

const makeRootReducer = () =>
  combineReducers({
    [AUTH_KEY]: authReducer
  })

export default makeRootReducer
