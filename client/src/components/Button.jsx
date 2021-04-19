import React from 'react'

const Button = ({ event, btnText, customClass }) => {
  return (
    <>
      <button
        onClick={event}
        type='button'
        className={`btn btn-primary ${customClass}`}
      >
        {btnText}
      </button>
    </>
  )
}

export default Button
