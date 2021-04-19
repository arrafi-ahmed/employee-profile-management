import React, { useRef, useContext } from 'react'
import { GlobalContext } from '../context/globalContext'
import EducationApi from '../api/education'

const CreateEducation = ({ showModal, setShowModal }) => {
  const global = useContext(GlobalContext)
  const school = useRef(null)
  const degree = useRef(null)
  const field = useRef(null)
  const start_year = useRef(null)
  const end_year = useRef(null)
  const grade = useRef(null)

  const handleEducation = (e) => {
    e.preventDefault()
    const educationData = {
      school: school.current.value,
      degree: degree.current.value,
      field: field.current.value,
      start_year: start_year.current.value,
      end_year: end_year.current.value,
      grade: grade.current.value,
    }
    EducationApi.createEducation(educationData)
      .then((res) => {
        if (res.data.education) {
          global.user.educations.push(res.data.education)
          global.setAlert({
            type: 'success',
            message: res.data.message,
          })
          setShowModal({ ...showModal, education: false })
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
      <form onSubmit={handleEducation}>
        <div className='row'>
          <div className='col-lg-6'>
            <div className='row mb-3'>
              <label htmlFor='school' className='col-sm-3 col-form-label'>
                School
              </label>
              <div className='col-sm-9'>
                <input
                  ref={school}
                  type='text'
                  className='form-control'
                  id='school'
                />
              </div>
            </div>
            <div className='row mb-3'>
              <label htmlFor='degree' className='col-sm-3 col-form-label'>
                Degree
              </label>
              <div className='col-sm-9'>
                <input
                  ref={degree}
                  type='text'
                  className='form-control'
                  id='degree'
                />
              </div>
            </div>
            <div className='row mb-3'>
              <label htmlFor='field' className='col-sm-3 col-form-label'>
                Field of Study
              </label>
              <div className='col-sm-9'>
                <input
                  ref={field}
                  type='text'
                  className='form-control'
                  id='field'
                />
              </div>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='row mb-3'>
              <label htmlFor='start_year' className='col-sm-3 col-form-label'>
                Start year
              </label>
              <div className='col-sm-9'>
                <input
                  ref={start_year}
                  type='date'
                  className='form-control'
                  id='start_year'
                />
              </div>
            </div>
            <div className='row mb-3'>
              <label htmlFor='end_year' className='col-sm-3 col-form-label'>
                End year
              </label>
              <div className='col-sm-9'>
                <input
                  ref={end_year}
                  type='date'
                  className='form-control'
                  id='end_year'
                />
              </div>
            </div>
            <div className='row mb-3'>
              <label htmlFor='grade' className='col-sm-3 col-form-label'>
                Grade
              </label>
              <div className='col-sm-9'>
                <input
                  ref={grade}
                  type='text'
                  className='form-control'
                  id='grade'
                />
              </div>
            </div>
          </div>
        </div>

        <button type='submit' className='btn btn-primary float-end'>
          Add Education
        </button>
      </form>
    </>
  )
}

export default CreateEducation
