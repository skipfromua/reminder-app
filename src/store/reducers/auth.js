import { merge } from 'lodash'

export const AUTH_KEY = 'auth'

const actions = {}
const initialState = {
  tokens: {
    auth: null,
  },
  currentUser: null,
}

// ------------------------------------
// Reducer
// ------------------------------------

const reducer = (state = initialState, action) => {
  const handler = actions[action.type]

  return handler ? handler(state, action) : state
}

export default reducer

// ------------------------------------
// Actions
// ------------------------------------

// User sign in
export const APPLY_USER_SIGN_IN = `${AUTH_KEY}/APPLY_USER_SIGN_IN`

actions[APPLY_USER_SIGN_IN] = (state, { payload }) =>
  merge({}, state, {
    tokens: { auth: payload.userAuth },
    currentUser: payload.currentUser,
  })

// User sign out
export const APPLY_USER_SIGN_OUT = `${AUTH_KEY}/APPLY_USER_SIGN_OUT`

actions[APPLY_USER_SIGN_OUT] = (state) =>
  merge({}, state, {
    tokens: { auth: null },
    currentUser: null,
  })

// Current user update
export const APPLY_CURRENT_USER_UPDATE = `${AUTH_KEY}/APPLY_CURRENT_USER_UPDATE`

actions[APPLY_CURRENT_USER_UPDATE] = (state, { payload }) =>
  merge({}, state, {
    currentUser: payload.currentUser,
  })
