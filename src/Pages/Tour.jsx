import React from 'react'
import HeaderOne from '../Components/Header/HeaderOne'
import FooterFour from '../Components/Footer/FooterFour'
import ScrollToTop from '../Components/ScrollToTop'
import PageHeroSlider from '../Components/Common/PageHeroSlider'
import TourInner from '../Components/Tour/TourInner'

function Tour() {
    return (
        <>
            <HeaderOne />
            <PageHeroSlider 
                page="tours"
                pageTitle="Tour Packages" 
                pageSubtitle="Scenic Hill Stations, Sacred Pilgrimages & Custom Holiday Itineraries"
                defaultBg="/assets/img/cabs/banner-tours.jpg" 
            />
            <TourInner />
            <FooterFour />
            <ScrollToTop />
        </>
    )
}

export default Tour
