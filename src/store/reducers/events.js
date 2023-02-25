import { merge } from 'lodash'

export const EVENTS_KEY = 'events'

const actions = {}
const initialState = {
  events: null
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

// Set events
export const SET_EVENTS = `${EVENTS_KEY}/SET_EVENTS`

actions[SET_EVENTS] = (state, { payload }) =>
  merge({}, {
    events: payload?.events,
  })