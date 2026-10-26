import React from 'react'
import HeaderOne from '../Components/Header/HeaderOne'
import FooterFour from '../Components/Footer/FooterFour'
import ScrollToTop from '../Components/ScrollToTop'
import Breadcrumb from '../Components/BreadCrumb/Breadcrumb'
import ServiceInner from '../Components/Services/ServiceInner'

function Service() {
    return (
        <>
            <HeaderOne />
            <Breadcrumb 
                title="Taxi Services" 
                subtitle="Reliable Outstation, Local & Airport Cabs at Flat Transparent Rates"
                bgImage="/assets/img/cabs/banner-default.jpg" 
            />
            <ServiceInner />
            <FooterFour />
            <ScrollToTop />
        </>
    )
}

export default Service
