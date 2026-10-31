import React from 'react'
import HeaderOne from '../Components/Header/HeaderOne'
import FooterFour from '../Components/Footer/FooterFour'
import ScrollToTop from '../Components/ScrollToTop'
import PageHeroSlider from '../Components/Common/PageHeroSlider'
import PricingPlan, { VehicleTariffTable } from '../Components/Services/PricingPlan'
import OneWayRoundTripDetails from '../Components/Services/OneWayRoundTripDetails'
import AirportPackages from '../Components/Services/AirportPackages'

function Pricing() {
    return (
        <>
            <HeaderOne />
            <PageHeroSlider 
                page="tariff"
                pageTitle="Tariff & Packages" 
                pageSubtitle="Guaranteed Transparent Fares • Zero Hidden Charges • Clean Kilometer Billing"
                defaultBg="/assets/img/cabs/svc-roundtrip.jpg" 
            />
            <PricingPlan className="space" />
            <OneWayRoundTripDetails />
            <AirportPackages />
            <VehicleTariffTable />
            <FooterFour />
            <ScrollToTop />
        </>
    )
}

export default Pricing
