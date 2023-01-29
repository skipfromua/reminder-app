import React from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'

import { AUTH_BY_CREDENTIALS_LINK } from '../../constants/links'
import { restRequest } from '../../utils/restAPI'
import { applyUserSignIn } from '../../store/actions/auth'
import { DASHBOARD } from '../../constants/routes'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      const config = {
        url: AUTH_BY_CREDENTIALS_LINK,
        method: 'post',
        data: { email: event?.target?.email?.value, password: event?.target?.password?.value },
      }
      const { authToken, user } = await restRequest(config)
      dispatch(applyUserSignIn(authToken, user))
      navigate(DASHBOARD)
    } catch (event) {
      alert(event)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        Login:
        <input type='email' name='email'/>
      </label>
      <label>
        Password:
        <input type='password' name='password' />
      </label>
      <input type='submit' value='Submit' />
    </form>
  )
}

export default Login
