import {
  APPLY_CURRENT_USER_UPDATE,
  APPLY_USER_SIGN_IN,
  APPLY_USER_SIGN_OUT,
} from '../reducers/auth'

const applyUserSignIn = (userAuth, currentUser) => ({
  type: APPLY_USER_SIGN_IN,
  payload: { userAuth, currentUser },
})

const applyUserSignOut = () => ({
  type: APPLY_USER_SIGN_OUT,
})

const applyCurrentUserUpdate = (currentUser) => ({
  type: APPLY_CURRENT_USER_UPDATE,
  payload: { currentUser },
})

export { applyUserSignIn, applyUserSignOut, applyCurrentUserUpdate }
