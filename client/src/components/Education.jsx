import React, { useContext } from 'react'
import Button from '../components/Button'
import { getDate } from '../util'
import { GlobalContext } from '../context/globalContext'
import EducationApi from '../api/education'

const Education = ({
  _id,
  school,
  degree,
  field,
  start_year,
  end_year,
  grade,
}) => {
  const global = useContext(GlobalContext)
  const handleDelete = (e) => {
    e.preventDefault()
    EducationApi.deleteEducation(_id)
      .then((res) => {
        if (res.data.education) {
          console.log(res.data.education._id)
          const filterEducation = global.user.educations.filter(
            (education) => education._id !== res.data.education._id
          )
          global.setUser({
            ...global.user,
            educations: filterEducation,
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
            <div className='col-lg-4 fw-bold'>School: </div>
            <div className='col-lg-8'>{school}</div>
          </div>
          <div className='row mb-3'>
            <div className='col-lg-4 fw-bold'>Degree: </div>
            <div className='col-lg-8'>{degree}</div>
          </div>
          <div className='row mb-3'>
            <div className='col-lg-4 fw-bold'>Field: </div>
            <div className='col-lg-8'>{field}</div>
          </div>
          <div className='row mb-3'>
            <div className='col-lg-4 fw-bold'>Start Year: </div>
            <div className='col-lg-8'>{getDate(start_year)}</div>
          </div>
          <div className='row mb-3'>
            <div className='col-lg-4 fw-bold'>End Year: </div>
            <div className='col-lg-8'>{getDate(end_year)}</div>
          </div>
          <div className='row mb-3'>
            <div className='col-lg-4 fw-bold'>Grade: </div>
            <div className='col-lg-8'>{grade}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Education
