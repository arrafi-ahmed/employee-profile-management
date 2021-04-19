import React from 'react'

const Title = ({ text }) => {
  return (
    <>
      <div className='mb-5'>
        <div className='border-bottom mb-3'>
          <h2>{text}</h2>
        </div>
      </div>
    </>
  )
}

export default Title
