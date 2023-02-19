import React from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import styles from './Login.module.css'
import { AUTH_BY_CREDENTIALS_LINK } from '../../constants/links'
import { restRequest } from '../../utils/restAPI'
import { applyUserSignIn } from '../../store/actions/auth'
import { DASHBOARD } from '../../constants/routes'
import PrimaryButton from '../../components/ui-kit/components/buttons/PrimaryButton'
import { TextField } from '@mui/material'
import { useState } from 'react'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (data) => {
    try {
      const config = {
        url: AUTH_BY_CREDENTIALS_LINK,
        method: 'post',
        data: { email: email, password: password },
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
        <div className={styles.form}>
          <TextField 
            value={email}
            type="email"
            label="Email"
            margin="dense"
            onChange={(event) => { setEmail(event?.target?.value) }}
          />
          <TextField 
            value={password}
            type="password"
            label="Password"
            margin="dense"
            onChange={(event) => { setPassword(event?.target?.value) }}
          />
          <PrimaryButton onClick={onSubmit}>Sign In</PrimaryButton>
        </div>
      </div>
    </div>
  )
}

export default Login
