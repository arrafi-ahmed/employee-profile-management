import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../context/globalContext'
import Title from './Title'
import Modal from './Modal'
import Button from './Button'
import PersonalInfo from './PersonalInfo'
import Education from './Education'
import Experience from './Experience'
import CreatePersonalInfo from './CreatePersonalInfo'
import CreateEducation from './CreateEducation'
import CreateExperience from './CreateExperience'
import Spinner from './Spinner'
import UserApi from '../api/user'

const Home = () => {
  const global = useContext(GlobalContext)
  const [showModal, setShowModal] = useState({
    personal: false,
    education: false,
    experience: false,
  })

  const fetchProfile = () => {
    UserApi.getProfile()
      .then((res) => {
        if (res.data.user) {
          global.setLoading(false)
          global.setUser(res.data.user)
        }
      })
      .catch((err) => {
        global.setAlert({
          type: 'danger',
          message: err.response ? err.response.data.message : err.toString(),
        })
      })
  }

  useEffect(() => {
    global.setLoading(true)
    fetchProfile()
  }, [])

  return (
    <>
      {global.loading ? (
        <Spinner />
      ) : (
        <main>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='topbar border-bottom pb-3 mb-5'>
                  <img
                    className='img-fluid profile'
                    src='/images/avatardefault.png'
                    alt='default-profile'
                  />
                  <span className='fw-bold h4 px-3'>
                    {global.user && global.user.username}
                  </span>

                  <br />
                </div>

                {/* personal info */}
                <div className='mb-5'>
                  <Button
                    event={() => setShowModal({ ...showModal, personal: true })}
                    btnText='+'
                    customClass='float-end'
                  />
                  <Title text='Personal Information' />
                  {showModal.personal && (
                    <Modal
                      title='Personal Information'
                      setShowModal={setShowModal}
                    >
                      <CreatePersonalInfo setShowModal={setShowModal} />
                    </Modal>
                  )}
                  <PersonalInfo />
                </div>

                {/* education */}
                <div className='mb-5'>
                  <Button
                    event={() =>
                      setShowModal({ ...showModal, education: true })
                    }
                    btnText='+'
                    customClass='float-end'
                  />
                  <Title text='Educations' />
                  {showModal.education && (
                    <Modal title='Education'>
                      <CreateEducation
                        showModal={showModal}
                        setShowModal={setShowModal}
                      />
                    </Modal>
                  )}
                  {(global.user &&
                    global.user.educations &&
                    global.user.educations.length > 0 &&
                    global.user.educations.map((education, index) => (
                      <>
                        <h4 className='border-bottom pb-2'>
                          School {index + 1}
                        </h4>
                        <Education key={education._id} {...education} />
                      </>
                    ))) || (
                    <h5 className='text-center border-bottom pb-5'>
                      No school found
                    </h5>
                  )}
                </div>

                {/* experience */}
                <div className='mb-5'>
                  <Button
                    event={() =>
                      setShowModal({ ...showModal, experience: true })
                    }
                    btnText='+'
                    customClass='float-end'
                  />
                  <Title text='Experiences' />
                  {showModal.experience && (
                    <Modal title='Experience'>
                      <CreateExperience
                        showModal={showModal}
                        setShowModal={setShowModal}
                      />
                    </Modal>
                  )}
                  {(global.user &&
                    global.user.experiences &&
                    global.user.experiences.length > 0 &&
                    global.user.experiences.map((experience, index) => (
                      <>
                        <h4 className='border-bottom pb-2'>
                          Company {index + 1}
                        </h4>
                        <Experience key={experience._id} {...experience} />
                      </>
                    ))) || (
                    <h5 className='text-center border-bottom pb-5'>
                      No company found
                    </h5>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  )
}

export default Home
