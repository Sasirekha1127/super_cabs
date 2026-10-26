import React from 'react'
import HeaderOne from '../Components/Header/HeaderOne'
import FooterFour from '../Components/Footer/FooterFour'
import ScrollToTop from '../Components/ScrollToTop'
import Breadcrumb from '../Components/BreadCrumb/Breadcrumb'
import FleetInner from '../Components/Fleet/FleetInner'

function Fleet() {
    return (
        <>
            <HeaderOne />
            <Breadcrumb 
                title="Our Fleet" 
                subtitle="Impeccably Maintained Hatchbacks, Sedans, SUVs & Tempo Travellers"
                bgImage="/assets/img/cabs/hero-2.jpg" 
            />
            <FleetInner />
            <FooterFour />
            <ScrollToTop />
        </>
    )
}

export default Fleet
