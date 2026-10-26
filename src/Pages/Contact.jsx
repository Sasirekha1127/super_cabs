import React from 'react'
import HeaderOne from '../Components/Header/HeaderOne'
import FooterFour from '../Components/Footer/FooterFour'
import ScrollToTop from '../Components/ScrollToTop'
import Breadcrumb from '../Components/BreadCrumb/Breadcrumb'
import GetInTouch from '../Components/Contact/GetInTouch'
import BookATour from '../Components/Contact/BookATour'
import ContactMap from '../Components/Contact/ContactMap'

function Contact() {
    return (
        <>
            <HeaderOne />
            <Breadcrumb 
                title="Contact Us" 
                subtitle="24/7 Dispatch Control Room • Doorstep Cabs Across Tamil Nadu"
                bgImage="/assets/img/cabs/hero-3.jpg" 
            />
            <GetInTouch />
            <BookATour />
            <ContactMap />
            <FooterFour />
            <ScrollToTop />
        </>
    )
}

export default Contact
