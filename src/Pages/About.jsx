import React from 'react'
import HeaderOne from '../Components/Header/HeaderOne'
import FooterFour from '../Components/Footer/FooterFour'
import ScrollToTop from '../Components/ScrollToTop'
import PageHeroSlider from '../Components/Common/PageHeroSlider'
import AboutFour from '../Components/About/AboutFour'
import VisionMission from '../Components/About/VisionMission'
import ExperienceSection from '../Components/About/ExperienceSection'
import CounterOne from '../Components/Counter/CounterOne'
import WhyChooseUs from '../Components/About/WhyChooseUs'
import TestimonialOne from '../Components/Testimonials/TestimonialOne'

function About() {
    return (
        <>
            <HeaderOne />
            <PageHeroSlider 
                page="about"
                pageTitle="About Us" 
                pageSubtitle="Trusted Taxi & Chauffeur Service across South India"
                defaultBg="/assets/img/cabs/about-1.jpg" 
            />
            <AboutFour />
            <VisionMission />
            <ExperienceSection />
            <CounterOne />
            <WhyChooseUs reverse />
            <TestimonialOne />
            <FooterFour />
            <ScrollToTop />
        </>
    )
}

export default About
