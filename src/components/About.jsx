import React from 'react'
import Footer from './Footer'


const About = () => {
  return (
    <div id='About' className='about-container'>
      <div className="content">
        <div className="px-4 d-flex justify-content-center align-items-center vh-100 text-center">
          <div className="col-lg-6 mx-auto">
            <h1 className="display-5 my-3 fw-bold">About Us</h1>
            <p className="lead mb-4">Newspulse is a dynamic platform designed to provide users with real-time news updates across various topics. The project focuses on delivering personalized, relevant news content in an easy-to-navigate format. With a modern interface and filtering options, users can stay informed on the latest headlines. The goal is to offer a seamless and engaging news experience that keeps readers connected to the world around them.</p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            </div>
          </div>
        </div>
      </div>
      <div className='fixed-bottom'>
      <Footer />
      </div>
    </div>
  )
}

export default About
