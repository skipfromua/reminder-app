import { AUTH_KEY } from '../reducers/auth'

const selectState = (state) => state[AUTH_KEY]
const selectAuthToken = (state) => selectState(state).tokens.auth
const selectCurrentUser = (state) => selectState(state).currentUser

export { selectState, selectAuthToken, selectCurrentUser }
