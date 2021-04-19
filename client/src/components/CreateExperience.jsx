import React, { useRef, useContext } from 'react'
import { GlobalContext } from '../context/globalContext'
import ExperienceApi from '../api/experience'

const CreateExperience = ({ showModal, setShowModal }) => {
  const global = useContext(GlobalContext)
  const title = useRef(null)
  const type = useRef(null)
  const company = useRef(null)
  const start_date = useRef(null)
  const end_date = useRef(null)

  const handleExperience = (e) => {
    e.preventDefault()
    const experienceData = {
      title: title.current.value,
      type: type.current.value,
      company: company.current.value,
      start_date: start_date.current.value,
      end_date: end_date.current.value,
    }
    ExperienceApi.createExperience(experienceData)
      .then((res) => {
        if (res.data.experience) {
          global.user.experiences.push(res.data.experience)
          global.setAlert({
            type: 'success',
            message: res.data.message,
          })
          setShowModal({ ...showModal, experience: false })
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
      <form onSubmit={handleExperience}>
        <div className='row'>
          <div className='col-lg-6'>
            <div className='row mb-3'>
              <label htmlFor='title' className='col-sm-3 col-form-label'>
                Title
              </label>
              <div className='col-sm-9'>
                <input
                  ref={title}
                  type='text'
                  className='form-control'
                  id='title'
                />
              </div>
            </div>
            <div className='row mb-3'>
              <label htmlFor='type' className='col-sm-3 col-form-label'>
                Employment type
              </label>
              <div className='col-sm-9'>
                <select ref={type} className='form-select' id='type'>
                  <option value={0}>Full time</option>
                  <option value={1}>Part time</option>
                  <option value={2}>Freelance</option>
                  <option value={3}>Internship</option>
                </select>
              </div>
            </div>
            <div className='row mb-3'>
              <label htmlFor='company' className='col-sm-3 col-form-label'>
                Company
              </label>
              <div className='col-sm-9'>
                <input
                  ref={company}
                  type='text'
                  className='form-control'
                  id='company'
                />
              </div>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='row mb-3'>
              <label htmlFor='start_date' className='col-sm-3 col-form-label'>
                Start date
              </label>
              <div className='col-sm-9'>
                <input
                  ref={start_date}
                  type='date'
                  className='form-control'
                  id='start_date'
                />
              </div>
            </div>
            <div className='row mb-3'>
              <label htmlFor='end_date' className='col-sm-3 col-form-label'>
                End date
              </label>
              <div className='col-sm-9'>
                <input
                  ref={end_date}
                  type='date'
                  className='form-control'
                  id='end_date'
                />
              </div>
            </div>
          </div>
        </div>

        <button type='submit' className='btn btn-primary float-end'>
          Add Experience
        </button>
      </form>
    </>
  )
}

export default CreateExperience
