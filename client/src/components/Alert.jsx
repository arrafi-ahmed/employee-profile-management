import React from 'react'

const Alert = ({ alert, event }) => {
  return (
    <>
      <div className='d-flex justify-content-center'>
        <div
          className={`alert custom-alert position-fixed alert-${alert.type} text-center mt-3`}
          role='alert'
        >
          {alert.message}
          <button
            type='button'
            className='btn-close'
            onClick={() => event({ message: null })}
          ></button>
        </div>
      </div>
    </>
  )
}

export default Alert
