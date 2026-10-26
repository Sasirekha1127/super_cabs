import React from 'react'
import HeaderOne from '../Components/Header/HeaderOne'
import Breadcrumb from '../Components/BreadCrumb/Breadcrumb'
import { Link } from 'react-router-dom'
import FooterFour from '../Components/Footer/FooterFour'
import ScrollToTop from '../Components/ScrollToTop'

function Error() {
  return (
    <>
      <HeaderOne />
      <Breadcrumb
        title="Page Not Found"
        bgImage="/assets/img/cabs/banner-default.jpg"
      />
      <section className="space bg-smoke">
        <div className="container">
          <div className="row flex-row-reverse align-items-center">
            <div className="col-lg-6">
              <div className="error-img">
                <img src="/assets/img/theme-img/error.svg" alt="404" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="error-content">
                <h2 className="error-title">Oops! Page Not Found</h2>
                <h4 className="error-subtitle">
                  The page you are looking for does not exist
                </h4>
                <p className="error-text">
                  Please go back to our homepage or contact Super Cabs to book your ride.
                </p>
                <Link to="/" className="th-btn style3">
                  <img src="/assets/img/icon/right-arrow2.svg" alt="" />
                  Go Back Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterFour />
      <ScrollToTop />
    </>
  )
}

export default Error
