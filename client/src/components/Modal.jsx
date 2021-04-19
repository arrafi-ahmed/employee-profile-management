import React from 'react'

const Modal = ({ title = null, children, setShowModal }) => {
  return (
    <>
      <div className='modal' tabIndex='-1'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{title}</h5>
              <button
                onClick={() => setShowModal(false)}
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
