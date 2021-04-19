import React from 'react'
import { NavLink } from 'react-router-dom'

const Links = ({ handleSignout, customClass = null }) => {
  const token = localStorage.getItem('token')
  return (
    <>
      <ul className={`navbar-nav ms-auto mb-2 mb-lg-0 ${customClass}`}>
        {(!token && (
          <li className='nav-item'>
            <NavLink
              exact
              to='/signin'
              className='nav-link'
              activeClassName='active'
            >
              Signin
            </NavLink>
          </li>
        )) || (
          <>
            <li className='nav-item pointer'>
              <span onClick={handleSignout} className='nav-link'>
                Signout
              </span>
            </li>
          </>
        )}
      </ul>
    </>
  )
}

export default Links
