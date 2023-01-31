import React from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import styles from './Login.module.css'
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
    <div className={styles.page}>
      <div className={styles.box}>
        <form className={styles.form} onSubmit={onSubmit}>
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
      </div>
    </div>
  )
}

export default Login
