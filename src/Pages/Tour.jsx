import React from 'react'
import HeaderOne from '../Components/Header/HeaderOne'
import FooterFour from '../Components/Footer/FooterFour'
import ScrollToTop from '../Components/ScrollToTop'
import Breadcrumb from '../Components/BreadCrumb/Breadcrumb'
import TourInner from '../Components/Tour/TourInner'

function Tour() {
    return (
        <>
            <HeaderOne />
            <Breadcrumb 
                title="Tour Packages" 
                subtitle="Scenic Hill Stations, Sacred Pilgrimages & Custom Holiday Itineraries"
                bgImage="/assets/img/cabs/banner-tours.jpg" 
            />
            <TourInner />
            <FooterFour />
            <ScrollToTop />
        </>
    )
}

export default Tour
