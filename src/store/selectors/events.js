import { EVENTS_KEY } from '../reducers/events'

const selectState = (state) => state[EVENTS_KEY]
const selectEvents = (state) => selectState(state).events

export { selectState, selectEvents }
