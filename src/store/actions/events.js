import { SET_EVENTS } from '../reducers/events'

const applySetEvents = (events) => ({
  type: SET_EVENTS,
  payload: { events },
})

export { applySetEvents }
