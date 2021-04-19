import React, { useState, useRef, useContext } from 'react'
import { GlobalContext } from '../context/globalContext'
import { getISODate } from '../util'
import UserApi from '../api/user'

const CreatePersonalInfo = ({ setShowModal }) => {
  const global = useContext(GlobalContext)
  const first_name = useRef(null)
  const last_name = useRef(null)
  const dob = useRef(null)
  const [gender, setGender] = useState('male')

  const handlePersonalInfo = (e) => {
    e.preventDefault()
    const personalData = {
      first_name: first_name.current.value,
      last_name: last_name.current.value,
      dob: dob.current.value,
      gender: gender,
    }
    UserApi.updateProfile(personalData)
      .then((res) => {
        console.log(res.data.user)
        global.setUser({ ...global.user, ...res.data.user })
        setShowModal(false)
        global.setAlert({
          type: 'success',
          message: res.data.message,
        })
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
      <form onSubmit={handlePersonalInfo}>
        <div className='row'>
          <div className='col-lg-6'>
            <div className='row mb-3'>
              <label htmlFor='first_name' className='col-sm-4 col-form-label'>
                First name
              </label>
              <div className='col-sm-8'>
                <input
                  defaultValue={global.user && global.user.first_name}
                  ref={first_name}
                  type='text'
                  className='form-control'
                  id='first_name'
                />
              </div>
            </div>
            <div className='row mb-3'>
              <label htmlFor='last_name' className='col-sm-4 col-form-label'>
                Last name
              </label>
              <div className='col-sm-8'>
                <input
                  defaultValue={global.user && global.user.last_name}
                  ref={last_name}
                  type='text'
                  className='form-control'
                  id='last_name'
                />
              </div>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='row mb-3'>
              <label htmlFor='dob' className='col-sm-4 col-form-label'>
                Date of Birth
              </label>
              <div className='col-sm-8'>
                <input
                  defaultValue={
                    global.user &&
                    global.user.dob &&
                    getISODate(global.user.dob)
                  }
                  ref={dob}
                  type='date'
                  className='form-control'
                  id='dob'
                />
              </div>
            </div>
            <div className='row mb-3'>
              <label htmlFor='gender' className='col-sm-4 col-form-label'>
                Gender
              </label>
              <div className='col-sm-8 mt-2' id='gender'>
                <div className='form-check d-inline-block'>
                  <input
                    defaultChecked={global.user && global.user.gender == 'male'}
                    className='form-check-input'
                    type='radio'
                    name='gender'
                    value='male'
                    selected={gender === 'male'}
                    onChange={() => setGender('male')}
                    id='male'
                  />
                  <label className='form-check-label' htmlFor='male'>
                    Male
                  </label>
                </div>
                <div className='form-check d-inline-block ms-4'>
                  <input
                    defaultChecked={
                      global.user && global.user.gender == 'female'
                    }
                    className='form-check-input'
                    type='radio'
                    name='gender'
                    id='female'
                    value='female'
                    selected={gender === 'female'}
                    onChange={() => setGender('female')}
                  />
                  <label className='form-check-label' htmlFor='female'>
                    Female
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button type='submit' className='btn btn-primary float-end'>
          Update
        </button>
      </form>
    </>
  )
}

export default CreatePersonalInfo
