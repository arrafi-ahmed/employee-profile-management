import axios from 'axios'
import { getToken } from '../util'

const apiUri = '/api/education'

const EducationApi = {
  createEducation(educationData) {
    return axios.post(`${apiUri}/createEducation`, educationData, {
      headers: { authorization: getToken() },
    })
  },
  deleteEducation(id) {
    return axios.post(
      `${apiUri}/deleteEducation`,
      { id },
      {
        headers: { authorization: getToken() },
      }
    )
  },
}

export default EducationApi
