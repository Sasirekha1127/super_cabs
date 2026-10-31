import React from 'react'
import HeaderOne from '../Components/Header/HeaderOne'
import FooterFour from '../Components/Footer/FooterFour'
import ScrollToTop from '../Components/ScrollToTop'
import PageHeroSlider from '../Components/Common/PageHeroSlider'
import FleetInner from '../Components/Fleet/FleetInner'

function Fleet() {
    return (
        <>
            <HeaderOne />
            <PageHeroSlider 
                page="fleet"
                pageTitle="Our Fleet" 
                pageSubtitle="Impeccably Maintained Hatchbacks, Sedans, SUVs & Tempo Travellers"
                defaultBg="/assets/img/cabs/hero-2.jpg" 
            />
            <FleetInner />
            <FooterFour />
            <ScrollToTop />
        </>
    )
}

export default Fleet
