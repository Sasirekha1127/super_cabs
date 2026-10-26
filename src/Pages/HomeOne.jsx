import React from 'react'
import HeaderOne from '../Components/Header/HeaderOne'
import FooterFour from '../Components/Footer/FooterFour'
import ScrollToTop from '../Components/ScrollToTop'
import BannerOne from '../Components/Banner/BannerOne'
import CategoryOne from '../Components/Category/CategoryOne'
import AboutOne from '../Components/About/AboutOne'
import WhyChooseUs from '../Components/About/WhyChooseUs'
import Cta from '../Components/Services/Cta'
import TestimonialOne from '../Components/Testimonials/TestimonialOne'

function HomeOne() {
    return (
        <>
            <HeaderOne />
            <BannerOne />
            <CategoryOne />
            <AboutOne />
            <Cta />
            <WhyChooseUs />
            <TestimonialOne />
            <FooterFour />
            <ScrollToTop />
        </>
    )
}

export default HomeOne
