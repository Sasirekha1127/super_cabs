import React from 'react'
import HeaderOne from '../Components/Header/HeaderOne'
import FooterFour from '../Components/Footer/FooterFour'
import ScrollToTop from '../Components/ScrollToTop'
import PageHeroSlider from '../Components/Common/PageHeroSlider'
import ServiceInner from '../Components/Services/ServiceInner'

function Service() {
    return (
        <>
            <HeaderOne />
            <PageHeroSlider 
                page="services"
                pageTitle="Taxi Services" 
                pageSubtitle="Reliable Outstation, Local & Airport Cabs at Flat Transparent Rates"
                defaultBg="/assets/img/cabs/banner-default.jpg" 
            />
            <ServiceInner />
            <FooterFour />
            <ScrollToTop />
        </>
    )
}

export default Service
