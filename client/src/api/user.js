import axios from 'axios'
import { getToken } from '../util'

const apiUri = '/api/user'

const UserApi = {
  isUserExist(username) {
    return axios.post(`${apiUri}/isUserExist`, { username })
  },
  createUser(signupData) {
    return axios.post(`${apiUri}/createUser`, signupData)
  },
  checkCredentials(signinData) {
    return axios.post(`${apiUri}/checkCredentials`, { ...signinData })
  },
  getProfile(signinData) {
    return axios.post(`${apiUri}/getProfile`, null, {
      headers: { authorization: getToken() },
    })
  },
  updateProfile(personalData) {
    return axios.post(`${apiUri}/updateProfile`, personalData, {
      headers: { authorization: getToken() },
    })
  },
}

export default UserApi
