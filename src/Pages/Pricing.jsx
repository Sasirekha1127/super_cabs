import React from 'react'
import HeaderOne from '../Components/Header/HeaderOne'
import FooterFour from '../Components/Footer/FooterFour'
import ScrollToTop from '../Components/ScrollToTop'
import Breadcrumb from '../Components/BreadCrumb/Breadcrumb'
import PricingPlan, { VehicleTariffTable } from '../Components/Services/PricingPlan'
import OneWayRoundTripDetails from '../Components/Services/OneWayRoundTripDetails'
import AirportPackages from '../Components/Services/AirportPackages'

function Pricing() {
    return (
        <>
            <HeaderOne />
            <Breadcrumb 
                title="Tariff & Packages" 
                subtitle="Guaranteed Transparent Fares • Zero Hidden Charges • Clean Kilometer Billing"
                bgImage="/assets/img/cabs/svc-roundtrip.jpg" 
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
