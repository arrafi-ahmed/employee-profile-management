import axios from 'axios'
import { getToken } from '../util'

const apiUri = '/api/experience'

const ExperienceApi = {
  createExperience(experienceData) {
    return axios.post(`${apiUri}/createExperience`, experienceData, {
      headers: { authorization: getToken() },
    })
  },
  deleteExperience(id) {
    return axios.post(
      `${apiUri}/deleteExperience`,
      { id },
      {
        headers: { authorization: getToken() },
      }
    )
  },
}

export default ExperienceApi
