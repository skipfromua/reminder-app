import axios from 'axios'
import { merge } from 'lodash'
import { camelizeKeys } from 'humps'
import appConfig from './appConfig'

const interceptRequests = () => {
  axios.defaults.baseURL = appConfig.API_URL
  axios.interceptors.request.use(
    (config) =>
      merge({}, config, {
        headers: merge({}, config.headers, {
          // Authorization: `Bearer ${selectToken(state, 'Auth')}`,
        }),
      }),

    (error) => {
      console.error('API Request Error: --------------------- v')
      return Promise.reject(error)
    },
  )
}

const interceptResponses = () => {
  axios.interceptors.response.use((response) => camelizeKeys(response.data))
}

const enableAxiosInterceptors = () => {
  interceptRequests()
  interceptResponses()
}

export default enableAxiosInterceptors
