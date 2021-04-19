import React, { useContext } from 'react'
import { getDate } from '../util'
import { GlobalContext } from '../context/globalContext'

const PersonalInfo = () => {
  const global = useContext(GlobalContext)
  return (
    <>
      <div className='d-flex justify-content-center'>
        <div className='col-lg-6'>
          <div className='row mb-3'>
            <div className='col-lg-4 fw-bold'>First Name: </div>
            <div className='col-lg-8'>
              {global.user && global.user.first_name}
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-lg-4 fw-bold'>Last Name: </div>
            <div className='col-lg-8'>
              {global.user && global.user.last_name}
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-lg-4 fw-bold'>Date of Birth: </div>
            <div className='col-lg-8'>
              {global.user && global.user.dob && getDate(global.user.dob)}
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-lg-4 fw-bold'>Gender: </div>
            <div className='col-lg-8 text-capitalize'>
              {global.user && global.user.gender}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PersonalInfo
