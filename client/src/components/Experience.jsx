import React, { useContext } from 'react'
import { getDate, formatJobType } from '../util'
import Button from '../components/Button'
import { GlobalContext } from '../context/globalContext'
import ExperienceApi from '../api/experience'

const Experience = ({ _id, title, type, company, start_date, end_date }) => {
  const global = useContext(GlobalContext)
  const handleDelete = (e) => {
    e.preventDefault()
    ExperienceApi.deleteExperience(_id)
      .then((res) => {
        if (res.data.experience) {
          console.log(res.data.experience._id)
          const filterExperience = global.user.experiences.filter(
            (experience) => experience._id !== res.data.experience._id
          )
          global.setUser({
            ...global.user,
            experiences: filterExperience,
          })
          global.setAlert({
            type: 'success',
            message: res.data.message,
          })
        }
      })
      .catch((err) => {
        global.setAlert({
          type: 'danger',
          message: err.response ? err.response.data.message : err.toString(),
        })
      })
  }
  return (
    <>
      <Button
        event={handleDelete}
        btnText='-'
        customClass='btn-danger float-end'
      />
      <div className='d-flex justify-content-center'>
        <div className='col-lg-6'>
          <div className='row mb-3'>
            <div className='col-lg-4 fw-bold'>Title: </div>
            <div className='col-lg-8'>{title}</div>
          </div>
          <div className='row mb-3'>
            <div className='col-lg-4 fw-bold'>Type: </div>
            <div className='col-lg-8'>{formatJobType(type)}</div>
          </div>
          <div className='row mb-3'>
            <div className='col-lg-4 fw-bold'>Company: </div>
            <div className='col-lg-8'>{company}</div>
          </div>
          <div className='row mb-3'>
            <div className='col-lg-4 fw-bold'>Start Date: </div>
            <div className='col-lg-8'>{getDate(start_date)}</div>
          </div>
          <div className='row mb-3'>
            <div className='col-lg-4 fw-bold'>End Date: </div>
            <div className='col-lg-8'>{getDate(end_date)}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Experience
