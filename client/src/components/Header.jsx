import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Links from '../components/Links'

const Header = () => {
  const token = localStorage.getItem('token')
  const [displayWidth, setDisplayWidth] = useState()
  const [showMobileNav, setShowMobileNav] = useState()
  const handleSignout = (e) => {
    e.preventDefault()
    localStorage.clear()
    window.location.replace('/signin')
  }
  const handleMobileNav = (e) => {
    e.preventDefault()
    setShowMobileNav(!showMobileNav)
  }
  useEffect(() => {
    setDisplayWidth(window.innerWidth)
  }, [])
  const isMobile = displayWidth < 576

  return (
    <>
      <header>
        <nav className='navbar navbar-expand-lg navbar-light bg-light mb-5'>
          <div className='container'>
            <NavLink to='/'>
              <span className='navbar-brand'>EmpPro</span>
            </NavLink>
            {(isMobile && (
              <>
                <span
                  class='navbar-toggler-icon'
                  onClick={handleMobileNav}
                ></span>
                {showMobileNav && (
                  <Links
                    customClass='navbar-mobile'
                    handleSignout={handleSignout}
                  />
                )}
              </>
            )) || <Links handleSignout={handleSignout} />}
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
